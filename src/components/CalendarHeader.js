import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react'
import { Button } from './ui/button'
import { MONTHS } from '../utils/dateUtils'

export default function CalendarHeader({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth,
  onTodayClick
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-semibold min-w-[200px] text-center">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button variant="outline" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        variant="secondary"
        size="sm"
        onClick={onTodayClick}
        className="hidden sm:flex items-center gap-2"
      >
        <CalendarIcon className="h-4 w-4" />
        Today
      </Button>
    </div>
  )
}

