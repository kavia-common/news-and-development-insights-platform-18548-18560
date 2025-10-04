import React from 'react';
import SearchBar from './SearchBar';

// PUBLIC_INTERFACE
export default function Header({ query, onSearch, onOpenBookmarks }) {
  /** Application header containing brand, search bar, and bookmarks button. */
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="News & Development Insights">
          <span className="dot" aria-hidden="true"></span>
          <span>News & Dev Insights</span>
        </div>

        <div style={{ flex: 1 }}>
          <SearchBar query={query} onSearch={onSearch} />
        </div>

        <div className="header-actions">
          <button
            className="btn btn-icon"
            onClick={onOpenBookmarks}
            aria-label="Open bookmarks"
            title="Bookmarks"
          >
            <span>⭐</span>
            <span>Bookmarks</span>
          </button>
        </div>
      </div>
    </header>
  );
}
