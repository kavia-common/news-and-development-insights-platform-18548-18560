import React from 'react';
import ArticleCard from './ArticleCard';

// PUBLIC_INTERFACE
export default function ArticlesGrid({ articles }) {
  /** Grid that displays a list of articles using ArticleCard. */
  if (!articles || articles.length === 0) {
    return (
      <div className="card surface">
        <p>No articles found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <section className="grid" aria-label="Articles">
      {articles.map((a) => (
        <div key={a.url} className="col-span-3 lg:col-span-4 md:col-span-3 sm:col-span-2">
          <ArticleCard article={a} />
        </div>
      ))}
    </section>
  );
}
