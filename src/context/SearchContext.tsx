import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { SearchState } from '../hooks/useSearch';

const SearchContext = createContext<SearchState | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext };
