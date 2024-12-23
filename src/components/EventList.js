import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { formatTime, getDayName } from '../utils/dateUtils'
import { Download, Edit, Trash2 } from 'lucide-react'
import { useEvents } from '../context/EventContext'

export default function EventList({ date, events, onEventClick }) {
  const { deleteEvent, exportEvents } = useEvents()

  const categoryColors = {
    work: "bg-blue-100 text-blue-800 border-blue-200",
    personal: "bg-green-100 text-green-800 border-green-200",
    important: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
  }

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(eventId)
    }
  }

  const handleExport = () => {
    try {
      exportEvents()
    } catch (error) {
      console.error('Failed to export events:', error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          Events for {getDayName(date)}, {date.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-muted-foreground text-center py-8"
            >
              No events scheduled for this day.
            </motion.p>
          ) : (
            <motion.div layout className="space-y-4">
              {events.map(event => (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group relative overflow-hidden rounded-lg border p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{event.title}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[event.category]} border`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEventClick(event)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit event</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete event</span>
                      </Button>
                    </div>
                  </div>
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 transition-all group-hover:h-[2px]" 
                    style={{ width: '100%' }} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

