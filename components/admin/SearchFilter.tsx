"use client";

import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  filters?: { label: string; value: string; options: { label: string; value: string }[] }[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
}

export default function SearchFilter({ searchValue, onSearchChange, searchPlaceholder = "Search...", filters, filterValues = {}, onFilterChange }: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 text-sm"
        />
      </div>
      {filters?.map(f => (
        <div key={f.label} className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={filterValues[f.label] ?? ""}
            onChange={e => onFilterChange?.(f.label, e.target.value)}
            aria-label={f.label}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-cyan-500/50"
          >
            {f.options.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
