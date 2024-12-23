import { useState, useCallback } from 'react'
import { useEvents } from '../context/EventContext'
import { WEEKDAYS_SHORT, getMonthDays, getMonthFirstDay, isToday } from '../utils/dateUtils'
import CalendarDay from './CalendarDay'
import EventModal from './EventModal'
import EventList from './EventList'
import SearchBar from './SearchBar'
import CalendarHeader from './CalendarHeader'
import { Card } from './ui/card'
import { motion, AnimatePresence } from 'framer-motion'

export default function Calendar() {
  const {
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
    events
  } = useEvents()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [direction, setDirection] = useState(0)

  const handlePrevMonth = useCallback(() => {
    setDirection(-1)
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const handleNextMonth = useCallback(() => {
    setDirection(1)
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const handleTodayClick = useCallback(() => {
    const today = new Date()
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }, [setSelectedDate])

  const handleDayClick = useCallback((date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
    setSelectedEvent(null)
  }, [setSelectedDate, setIsModalOpen, setSelectedEvent])

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event)
    setSelectedDate(new Date(event.date))
    setIsModalOpen(true)
  }, [setSelectedEvent, setSelectedDate, setIsModalOpen])

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setFilterCategory('all')
  }, [setSearchTerm, setFilterCategory])

  const renderCalendarDays = useCallback(() => {
    const days = []
    const monthDays = getMonthDays(currentDate.getMonth(), currentDate.getFullYear())
    const firstDay = getMonthFirstDay(currentDate.getMonth(), currentDate.getFullYear())

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className="h-28 border border-border/50 bg-muted/30"
        />
      )
    }

    // Cells for each day of the month
    for (let day = 1; day <= monthDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = events.filter(event => 
        new Date(event.date).toDateString() === date.toDateString()
      )
      
      days.push(
        <CalendarDay
          key={date.toISOString()}
          date={date}
          events={dayEvents}
          isToday={isToday(date)}
          isSelected={selectedDate && date.toDateString() === selectedDate.toDateString()}
          onSelect={handleDayClick}
          onEventClick={handleEventClick}
        />
      )
    }

    return days
  }, [currentDate, events, selectedDate, handleDayClick, handleEventClick])

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card className="p-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onTodayClick={handleTodayClick}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          onClear={handleClearFilters}
        />

        <div className="grid grid-cols-7 gap-px mt-6 mb-2">
          {WEEKDAYS_SHORT.map(day => (
            <div key={day} className="p-2 text-center font-semibold">
              {day}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDate.toISOString()}
            initial={{ x: direction * 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-7 gap-px bg-border"
          >
            {renderCalendarDays()}
          </motion.div>
        </AnimatePresence>
      </Card>

      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <EventList
              date={selectedDate}
              events={events.filter(event => 
                new Date(event.date).toDateString() === selectedDate.toDateString()
              )}
              onEventClick={handleEventClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        event={selectedEvent}
      />
    </div>
  )
}

