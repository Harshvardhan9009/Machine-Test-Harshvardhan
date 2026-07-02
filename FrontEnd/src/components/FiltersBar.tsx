import { CATEGORIES } from '../constants/categories'
import './FiltersBar.css'

interface FiltersBarProps {
  search: string
  category: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function FiltersBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: FiltersBarProps) {
  return (
    <div className="filters-bar">
      <label className="filter-field">
        <span>Search</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search comments..."
        />
      </label>

      <label className="filter-field">
        <span>Category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
