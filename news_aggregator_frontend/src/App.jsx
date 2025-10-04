import React, { useEffect, useMemo, useState } from 'react';
import './theme.css';
import { BookmarksProvider } from './context/BookmarksContext';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import ArticlesGrid from './components/ArticlesGrid';
import BookmarksModal from './components/BookmarksModal';
import JiraPanel from './components/JiraPanel';
import { fetchNews } from './services/newsApi';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * App component for the News Aggregator:
   * - Manages search, category filter, results, loading, error, and banner states.
   * - Uses BookmarksProvider context for bookmark actions.
   * - Shows JiraPanel as a placeholder visualization.
   */
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showConfigBanner, setShowConfigBanner] = useState(false);

  const hasApiKey = useMemo(
    () => !!process.env.REACT_APP_NEWSAPI_API_KEY,
    []
  );

  useEffect(() => {
    if (!hasApiKey) {
      setShowConfigBanner(true);
    }
  }, [hasApiKey]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setErrorMsg('');
      try {
        const result = await fetchNews({ q: query, category });
        if (!ignore) {
          setArticles(result);
        }
      } catch (e) {
        if (!ignore) {
          setErrorMsg(e?.message || 'Failed to load news.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => { ignore = true; };
  }, [query, category]);

  return (
    <BookmarksProvider>
      <div className="app-shell">
        <Header
          query={query}
          onSearch={setQuery}
          onOpenBookmarks={() => setShowBookmarks(true)}
        />

        {showConfigBanner && (
          <div className="banner" role="status" aria-live="polite">
            <div className="banner-content">
              <span>
                Running with mock data. Set REACT_APP_NEWSAPI_API_KEY in .env to enable live news.
              </span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowConfigBanner(false)}
              aria-label="Dismiss configuration banner"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="layout">
          <aside className="sidebar" aria-label="News categories">
            <CategorySidebar
              activeCategory={category}
              onSelectCategory={setCategory}
            />
            <div className="jira-panel-wrap">
              <JiraPanel />
            </div>
          </aside>

          <main className="content" role="main">
            {loading && (
              <div className="card surface">
                <p>Loading articles...</p>
              </div>
            )}
            {errorMsg && !loading && (
              <div className="card surface error" role="alert">
                <p>{errorMsg}</p>
              </div>
            )}
            {!loading && !errorMsg && (
              <ArticlesGrid articles={articles} />
            )}
          </main>
        </div>

        <BookmarksModal
          open={showBookmarks}
          onClose={() => setShowBookmarks(false)}
        />
      </div>
    </BookmarksProvider>
  );
}
