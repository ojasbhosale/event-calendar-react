import { cn } from '../../lib/utils'

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children }) {
  return children
}

export function SelectValue({ children }) {
  return children
}

export function SelectContent({ children }) {
  return children
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>
}