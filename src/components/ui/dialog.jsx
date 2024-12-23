import { useEffect } from 'react'
import { cn } from '../../lib/utils'

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className }) {
  return (
    <div className={cn("bg-background rounded-lg shadow-lg w-full max-w-lg p-6", className)}>
      {children}
    </div>
  )
}

export function DialogHeader({ children, className }) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export function DialogTitle({ children, className }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
}