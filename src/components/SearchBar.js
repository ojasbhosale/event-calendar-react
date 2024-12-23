import { Search, Filter, X } from 'lucide-react'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Button } from './ui/button'

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  filterCategory, 
  onFilterChange,
  onClear 
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-8"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-[150px]"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="important">Important</option>
        </Select>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClear}
          className="whitespace-nowrap"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

