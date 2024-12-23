import { motion } from 'framer-motion'

export default function EventIndicator({ event, onClick }) {
  const categoryColors = {
    work: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
    personal: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
    important: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
  }

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      onClick={onClick}
      className={`
        w-full px-2 py-1 text-xs rounded-full border 
        truncate cursor-pointer transition-colors
        ${categoryColors[event.category]}
      `}
    >
      {event.title}
    </motion.button>
  )
}

