const BASE_URL = 'https://newsapi.org/v2';

const MOCK_ARTICLES = [
  {
    title: 'Ocean Tech Advances: AI-driven Buoys Transform Marine Research',
    url: 'https://example.com/ocean-tech-ai-buoys',
    urlToImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    description: 'Researchers deploy AI-enabled buoys to monitor ocean temperatures, currents, and ecosystems in real time.',
    source: { name: 'Marine Today' },
    publishedAt: new Date(Date.now() - 3600_000).toISOString()
  },
  {
    title: 'Frontend Performance in 2025: What Matters Most',
    url: 'https://example.com/frontend-performance-2025',
    urlToImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    description: 'A deep dive into modern frontend performance strategies and tooling updates.',
    source: { name: 'Dev Weekly' },
    publishedAt: new Date(Date.now() - 7200_000).toISOString()
  },
  {
    title: 'Jira Dashboard Patterns for Engineering Teams',
    url: 'https://example.com/jira-dashboard-patterns',
    urlToImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    description: 'Common dashboard designs to improve visibility and flow across squads.',
    source: { name: 'Agile Insights' },
    publishedAt: new Date(Date.now() - 5400_000).toISOString()
  }
];

// PUBLIC_INTERFACE
export async function fetchNews({ q = '', category = 'general', pageSize = 24 } = {}) {
  /**
   * Fetches news from NewsAPI if REACT_APP_NEWSAPI_API_KEY is present; otherwise returns mocks.
   * Handles errors and normalizes the result to an array of articles.
   */
  const apiKey = process.env.REACT_APP_NEWSAPI_API_KEY;
  if (!apiKey) {
    // Filter MOCKS for a better preview if query is provided
    const filtered = MOCK_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q.toLowerCase())
    );
    return filtered.length ? filtered : MOCK_ARTICLES;
  }

  const params = new URLSearchParams();
  // Use top-headlines when category is provided and query is empty, otherwise everything endpoint
  let endpoint = 'top-headlines';
  if (q && q.trim().length > 0) {
    endpoint = 'everything';
    params.set('q', q.trim());
    params.set('sortBy', 'publishedAt');
  } else {
    params.set('category', category || 'general');
    params.set('country', 'us');
  }
  params.set('pageSize', String(pageSize));
  params.set('apiKey', apiKey);

  const url = `${BASE_URL}/${endpoint}?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    let detail = '';
    try {
      const json = await res.json();
      detail = json?.message || json?.error || '';
    } catch {
      // ignore parsing error
    }
    throw new Error(`News API Error (${res.status}): ${detail || res.statusText}`);
  }

  const json = await res.json();
  const articles = Array.isArray(json?.articles) ? json.articles : [];
  return articles.map((a) => ({
    title: a.title,
    url: a.url,
    urlToImage: a.urlToImage,
    description: a.description,
    source: a.source,
    publishedAt: a.publishedAt
  }));
}
