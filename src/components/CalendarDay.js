import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "../lib/utils";
import EventIndicator from './EventIndicator';
import { isWeekend } from '../utils/dateUtils';

export default function CalendarDay({ 
  date, 
  events, 
  isToday, 
  isSelected, 
  onSelect, 
  onEventClick 
}) {
  return (
    <motion.div
      layout
      className={cn(
        "h-28 border border-border/50 p-2 transition-all hover:bg-accent/50 cursor-pointer relative group",
        isWeekend(date) && "bg-muted/50",
        isToday && "ring-2 ring-primary",
        isSelected && "bg-accent"
      )}
      onClick={() => onSelect(date)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="font-semibold mb-1">{date.getDate()}</div>
      <div className="space-y-1 overflow-hidden">
        <AnimatePresence>
          {events.slice(0, 2).map(event => (
            <EventIndicator
              key={event.id}
              event={event}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
            />
          ))}
          {events.length > 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground text-center"
            >
              +{events.length - 2} more
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {events.length > 0 && (
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  );
}

