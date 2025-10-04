import React from 'react';
import { useBookmarks } from '../context/BookmarksContext';
import { formatDate } from '../utils/format';
import { shareArticle } from '../utils/share';

// PUBLIC_INTERFACE
export default function ArticleCard({ article }) {
  /** Displays article info with image, metadata, and actions. */
  const { addBookmark } = useBookmarks();
  const {
    title,
    url,
    urlToImage,
    description,
    source,
    publishedAt
  } = article;

  const handleShare = () => {
    shareArticle({ url, title });
  };

  return (
    <article className="article surface" aria-labelledby={`title-${url}`}>
      <div className="thumb" aria-hidden="true">
        {urlToImage ? (
          <img src={urlToImage} alt="" />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#e5e7eb' }} />
        )}
      </div>
      <div className="body">
        <h3 id={`title-${url}`} style={{ margin: 0, fontSize: 16, lineHeight: 1.35 }}>
          {title}
        </h3>
        <div className="meta">
          <span>{source?.name || 'Unknown'}</span>
          <span>•</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        {description && (
          <p style={{ margin: 0, color: '#374151', fontSize: 14 }}>
            {description}
          </p>
        )}
        <div className="actions">
          <a
            className="btn btn-icon btn-sm"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open full article"
          >
            <span>🔗</span>
            <span>Open</span>
          </a>
          <button
            className="btn btn-icon btn-sm"
            onClick={() => addBookmark(article)}
            aria-label="Bookmark article"
            title="Bookmark"
          >
            <span>⭐</span>
            <span>Save</span>
          </button>
          <button
            className="btn btn-icon btn-sm"
            onClick={handleShare}
            aria-label="Share article"
            title="Share"
          >
            <span>📤</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}
