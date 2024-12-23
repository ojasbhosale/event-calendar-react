import { createLocalDate, timeToMinutes, formatDateForInput, isSameDay } from '../utils/dateUtils';

const STORAGE_KEY = 'calendar_events';

class EventService {
  getEvents() {
    try {
      const events = localStorage.getItem(STORAGE_KEY);
      return events ? JSON.parse(events) : [];
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  saveEvents(events) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events:', error);
      throw new Error('Failed to save events');
    }
  }

  validateEvent(event) {
    if (!event.title?.trim()) {
      throw new Error('Title is required');
    }
    if (!event.date) {
      throw new Error('Date is required');
    }
    if (!event.startTime || !event.endTime) {
      throw new Error('Start and end times are required');
    }

    const startMinutes = timeToMinutes(event.startTime);
    const endMinutes = timeToMinutes(event.endTime);

    if (startMinutes >= endMinutes) {
      throw new Error('End time must be after start time');
    }
  }

  checkEventOverlap(newEvent, existingEvents) {
    const newStart = timeToMinutes(newEvent.startTime);
    const newEnd = timeToMinutes(newEvent.endTime);

    return existingEvents.some(existing => {
      if (existing.id === newEvent.id) return false;
      
      const existingStart = timeToMinutes(existing.startTime);
      const existingEnd = timeToMinutes(existing.endTime);

      return (newStart < existingEnd && newEnd > existingStart);
    });
  }

  addEvent(eventData) {
    try {
      this.validateEvent(eventData);

      const localDate = createLocalDate(eventData.date);
      const formattedDate = formatDateForInput(localDate);
      
      const dateEvents = this.getEventsByDate(localDate);
      
      const newEvent = {
        ...eventData,
        id: Date.now().toString(),
        date: formattedDate,
        createdAt: new Date().toISOString()
      };

      if (this.checkEventOverlap(newEvent, dateEvents)) {
        throw new Error('This time slot overlaps with an existing event');
      }

      const events = this.getEvents();
      events.push(newEvent);
      this.saveEvents(events);

      return newEvent;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  updateEvent(eventData) {
    try {
      this.validateEvent(eventData);

      const events = this.getEvents();
      const index = events.findIndex(e => e.id === eventData.id);
      
      if (index === -1) {
        throw new Error('Event not found');
      }

      const localDate = createLocalDate(eventData.date);
      const formattedDate = formatDateForInput(localDate);
      
      const dateEvents = this.getEventsByDate(localDate)
        .filter(e => e.id !== eventData.id);

      const updatedEvent = {
        ...eventData,
        date: formattedDate,
        updatedAt: new Date().toISOString()
      };

      if (this.checkEventOverlap(updatedEvent, dateEvents)) {
        throw new Error('This time slot overlaps with an existing event');
      }

      events[index] = updatedEvent;
      this.saveEvents(events);

      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  deleteEvent(eventId) {
    try {
      const events = this.getEvents();
      const filteredEvents = events.filter(e => e.id !== eventId);
      this.saveEvents(filteredEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  getEventsByDate(date) {
    try {
      const targetDate = createLocalDate(date);
      const events = this.getEvents();
      
      return events
        .filter(event => isSameDay(new Date(event.date), targetDate))
        .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    } catch (error) {
      console.error('Error getting events by date:', error);
      return [];
    }
  }

  exportEvents() {
    try {
      const events = this.getEvents();
      const dataStr = JSON.stringify(events, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `calendar-events-${formatDateForInput(new Date())}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      linkElement.remove();
    } catch (error) {
      console.error('Error exporting events:', error);
      throw new Error('Failed to export events');
    }
  }
}

export const eventService = new EventService();

