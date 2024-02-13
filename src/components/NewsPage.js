// src/components/NewsPage.js
import React, { useState, useEffect } from 'react';
import './NewsPage.css'; // Import CSS file for component styling
import SearchForm from './SearchForm';
import NewsDisplay from './NewsDisplay';

const NewsPage = () => {
  const [newsData, setNewsData] = useState(null);
  const apiKey = 'a8ea29a09aab46288028ba3e9af59c25';

  const fetchNews = async (searchQuery) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q="cars"+ ${searchQuery}&apiKey=${apiKey}`);
      const data = await response.json();
      setNewsData(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    // Fetch initial news data when component mounts
    fetchNews('cars'); // Fetch news related to cars by default
  }, []);

  const searchNews = async (searchQuery) => {
    fetchNews(searchQuery);
  };

  return (
    <div className="news-page">
      <h1>News App</h1>
      <SearchForm onSubmit={searchNews} />
      {newsData && <NewsDisplay articles={newsData} />}
    </div>
  );
};

export default NewsPage;
