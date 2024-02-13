// src/components/NewsDisplay.js
import React from 'react';
import './NewsDisplay.css'; // Import CSS file for component styling

const NewsDisplay = ({ articles }) => {
  return (
    <div className="news-display">
      <h2 className="news-header">Latest News</h2>
      {articles.map((article, index) => (
        <div key={index} className="news-article">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-description">{article.description}</p>
          <p className="article-source">Source: {article.source.name}</p>
          <a href={article.url} className="article-link" target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsDisplay;
