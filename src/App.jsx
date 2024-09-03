import { useState } from 'react'; 
import './App.css';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import axios from 'axios';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn';

const ACCESS_KEY = 'RFQ_SqOLGRkL-6vTpJDhmFhaUpiWfOof6J4XnRBaTgc';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchArticlesWithTopic = async (topic) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: topic, per_page: 10 },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`, 
        },
      });

      return response.data.results; 
    } catch (error) {
      console.error("Błąd przy pobieraniu danych z Unsplash:", error);
      throw error;
    }
  };

  const handleSearch = async (topic) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader /> }
      {error && <ErrorMessage />}
      <ImageGallery articles={articles} />
      <LoadMoreBtn />
    </>
  );
}

export default App;
