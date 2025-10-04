import React from 'react';

const CATEGORIES = [
  { key: 'general', label: 'General', icon: '📰' },
  { key: 'business', label: 'Business', icon: '💼' },
  { key: 'technology', label: 'Technology', icon: '💻' },
  { key: 'science', label: 'Science', icon: '🔬' },
  { key: 'health', label: 'Health', icon: '🏥' },
  { key: 'sports', label: 'Sports', icon: '🏅' },
  { key: 'entertainment', label: 'Entertainment', icon: '🎭' }
];

// PUBLIC_INTERFACE
export default function CategorySidebar({ activeCategory, onSelectCategory }) {
  /** Sidebar list of categories with active state. */
  return (
    <div className="surface category" role="navigation" aria-label="Categories">
      <div className="title">Categories</div>
      <div className="category-list" role="list">
        {CATEGORIES.map((c) => {
          const active = c.key === activeCategory;
          return (
            <button
              key={c.key}
              className={`category-item ${active ? 'active' : ''}`}
              role="listitem"
              aria-current={active ? 'true' : 'false'}
              onClick={() => onSelectCategory(c.key)}
            >
              <span aria-hidden="true">{c.icon}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
