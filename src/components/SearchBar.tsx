import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { fetchSuggestions } from "../api/pappers";
import { debounce } from "../utils/debounce";

export function SearchBar() {
  const { query, setQuery } = useSearch();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    
    const debouncedFetch = debounce(async () => {
      try {
        const data = await fetchSuggestions(query);
        // Get up to 5 suggestions from both entreprises and représentants
        const entreprises = data.resultats_nom_entreprise?.map((e: any) => e.nom_entreprise) || [];
        const representants = data.resultats_representant?.map((r: any) => r.nom_complet) || [];
        const allSuggestions = [...entreprises, ...representants];
        
        setSuggestions(allSuggestions.slice(0, 5)); // Max 5 suggestions
        setShowDropdown(allSuggestions.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 300);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          placeholder="Rechercher par nom ou SIREN…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setShowDropdown(false);
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            aria-label="Clear"
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        )}
      </div>

      {/* Dropdown with suggestions */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Recherche en cours...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                  index === selectedIndex ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                }`}
                onClick={() => selectSuggestion(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="truncate">{suggestion}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              Aucune suggestion trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}