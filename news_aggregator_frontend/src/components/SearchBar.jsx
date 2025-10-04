import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ query, onSearch }) {
  /** Search bar with input and submit button. */
  const [value, setValue] = useState(query || '');

  const submit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className="searchbar" onSubmit={submit} role="search" aria-label="News search">
      <div className="input" aria-live="polite">
        <span aria-hidden="true">🔎</span>
        <input
          type="text"
          placeholder="Search news (e.g., react, cloud, open source)"
          aria-label="Search news"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button className="btn btn-primary btn-icon" type="submit" aria-label="Search">
        <span>Search</span>
      </button>
    </form>
  );
}
