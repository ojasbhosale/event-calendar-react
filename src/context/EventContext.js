import { createContext, useContext, useState, useCallback, useReducer, useEffect } from 'react';
import { eventService } from '../services/eventService';
import { toast } from 'react-hot-toast';

const EventContext = createContext(null);

const ACTIONS = {
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

function eventReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_EVENTS:
      return { ...state, events: action.payload, loading: false };
    case ACTIONS.ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case ACTIONS.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case ACTIONS.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, {
    events: [],
    loading: true,
    error: null
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const loadEvents = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const events = eventService.getEvents();
      dispatch({ type: ACTIONS.SET_EVENTS, payload: events });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to load events');
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const addEvent = useCallback(async (eventData) => {
    try {
      const newEvent = await eventService.addEvent(eventData);
      dispatch({ type: ACTIONS.ADD_EVENT, payload: newEvent });
      toast.success('Event added successfully');
      return newEvent;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, []);

  const updateEvent = useCallback(async (eventData) => {
    try {
      const updatedEvent = await eventService.updateEvent(eventData);
      dispatch({ type: ACTIONS.UPDATE_EVENT, payload: updatedEvent });
      toast.success('Event updated successfully');
      return updatedEvent;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, []);

  const deleteEvent = useCallback(async (eventId) => {
    try {
      await eventService.deleteEvent(eventId);
      dispatch({ type: ACTIONS.DELETE_EVENT, payload: eventId });
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
      throw error;
    }
  }, []);

  const filteredEvents = state.events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const value = {
    events: filteredEvents,
    loading: state.loading,
    error: state.error,
    selectedDate,
    setSelectedDate,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    setSelectedEvent,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    addEvent,
    updateEvent,
    deleteEvent,
    exportEvents: eventService.exportEvents.bind(eventService)
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}

