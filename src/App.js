import Calendar from './components/Calendar'
import { EventProvider } from './context/EventContext'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ErrorBoundary>
      <EventProvider>
        <div className="min-h-screen bg-background py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Event Calendar</h1>
            <Calendar />
          </div>
        </div>
        <Toaster position="bottom-right" />
      </EventProvider>
    </ErrorBoundary>
  )
}

export default App

