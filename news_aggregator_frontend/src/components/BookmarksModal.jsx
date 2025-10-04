import React, { useEffect, useRef } from 'react';
import { useBookmarks } from '../context/BookmarksContext';
import { formatDate } from '../utils/format';

// PUBLIC_INTERFACE
export default function BookmarksModal({ open, onClose }) {
  /** Displays bookmarked articles in a modal; allows removal. */
  const { bookmarks, removeBookmark } = useBookmarks();
  const dialogRef = useRef(null);

  useEffect(() => {
    function escHandler(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', escHandler);
    return () => document.removeEventListener('keydown', escHandler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Bookmarks">
      <div className="modal" ref={dialogRef}>
        <div className="modal-header">
          <strong>Bookmarks</strong>
          <button className="btn btn-sm" onClick={onClose} aria-label="Close bookmarks modal">
            Close
          </button>
        </div>
        <div className="modal-body">
          {bookmarks.length === 0 ? (
            <p>No bookmarks yet.</p>
          ) : (
            <div className="grid">
              {bookmarks.map((a) => (
                <div key={a.url} className="col-span-3 lg:col-span-4 md:col-span-3 sm:col-span-2">
                  <div className="article surface">
                    <div className="thumb" aria-hidden="true">
                      {a.urlToImage ? (
                        <img src={a.urlToImage} alt="" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: '#e5e7eb' }} />
                      )}
                    </div>
                    <div className="body">
                      <h3 style={{ margin: 0, fontSize: 16, lineHeight: 1.35 }}>
                        {a.title}
                      </h3>
                      <div className="meta">
                        <span>{a.source?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>{formatDate(a.publishedAt)}</span>
                      </div>
                      <div className="actions">
                        <a
                          className="btn btn-sm"
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </a>
                        <button
                          className="btn btn-sm"
                          onClick={() => removeBookmark(a.url)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
