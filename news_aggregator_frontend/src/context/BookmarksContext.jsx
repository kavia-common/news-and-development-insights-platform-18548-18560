import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BookmarksContext = createContext(undefined);

/**
 * Shape of an Article:
 * { title, url, urlToImage, description, source, publishedAt }
 */

// PUBLIC_INTERFACE
export function BookmarksProvider({ children }) {
  /** Provides bookmarking state and actions, persisted in localStorage. */
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem('bookmarks_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bookmarks_v1', JSON.stringify(bookmarks));
    } catch {
      // ignore storage errors
    }
  }, [bookmarks]);

  // PUBLIC_INTERFACE
  const addBookmark = (article) => {
    setBookmarks((prev) => {
      if (prev.find((a) => a.url === article.url)) return prev;
      return [article, ...prev];
    });
  };

  // PUBLIC_INTERFACE
  const removeBookmark = (url) => {
    setBookmarks((prev) => prev.filter((a) => a.url !== url));
  };

  const value = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark
  }), [bookmarks]);

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useBookmarks() {
  /** Access the bookmarks context. */
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarksProvider');
  return ctx;
}
