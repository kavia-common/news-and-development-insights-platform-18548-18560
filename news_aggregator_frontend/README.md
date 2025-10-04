# News & Development Insights Platform - Frontend

This is a React-based News Aggregator frontend with search, category filters, bookmarking, social sharing, and a placeholder Jira visualization panel. It follows the "Ocean Professional" theme.

Features
- Search news articles by keyword
- Filter by category
- Bookmark articles (persisted in localStorage)
- Social sharing via Web Share API or fallback links
- Jira visualization panel (placeholder with sample data)
- Ocean Professional theme with responsive design
- Mock data fallback when NEWSAPI_API_KEY is not set
- Graceful error handling and user-friendly messages

Getting Started
1. Install dependencies
   npm install

2. Configure environment
   - Copy .env.example to .env and set variables as needed
   - If NEWSAPI_API_KEY is not set, the app will use mock data and show a configuration banner

3. Run the app (port 3000)
   npm start
   Open http://localhost:3000

Environment Variables
See .env.example in the project root. Required for live data:

- REACT_APP_NEWSAPI_API_KEY: Your NewsAPI key (https://newsapi.org/)
- Optional Jira placeholders:
  - REACT_APP_JIRA_BASE_URL: Jira Cloud site (e.g., https://yourcompany.atlassian.net)
  - REACT_APP_JIRA_EMAIL: Jira account email
  - REACT_APP_JIRA_API_TOKEN: Jira API token

Theme: Ocean Professional
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Notes
- The app uses fetch() to call https://newsapi.org/v2 with apiKey query param when available.
- If the API key is absent, the app falls back to mock data.
- The Jira panel currently displays static sample stats to illustrate UI/UX. It reads optional env vars safely.

Accessibility
- Keyboard focusable controls, proper aria attributes on interactive elements and modals.

License
MIT
