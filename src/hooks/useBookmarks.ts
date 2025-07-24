import { useState } from 'react';

export function useBookmarks() {
  const [bookmarked, setBookmarked] = useState(new Set<string>());

  const toggleBookmark = (siren: string) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(siren)) {
      newBookmarked.delete(siren);
    } else {
      newBookmarked.add(siren);
    }
    setBookmarked(newBookmarked);
  };

  const isBookmarked = (siren: string) => bookmarked.has(siren);

  return {
    toggleBookmark,
    isBookmarked,
    bookmarkedItems: Array.from(bookmarked)
  };
}