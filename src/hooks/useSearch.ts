import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { SearchContext } from '../context/SearchContext';

export interface SearchState {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export function useSearch(): SearchState {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return ctx;
}
