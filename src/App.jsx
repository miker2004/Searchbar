import { useState } from 'react'; 
import './App.css';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import axios from 'axios';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn';
import ImageModal from './components/ImageModal';

const ACCESS_KEY = 'RFQ_SqOLGRkL-6vTpJDhmFhaUpiWfOof6J4XnRBaTgc';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const fetchArticlesWithTopic = async (topic, page) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: topic, per_page: 10, page: page },
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
    setTopic(topic); 
    setPage(1); 
    try {
      const data = await fetchArticlesWithTopic(topic, 1);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    setError(false);
    try {
      const newPage = page + 1;
      const data = await fetchArticlesWithTopic(topic, newPage);
      setArticles((prevArticles) => [...prevArticles, ...data]);
      setPage(newPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image); 
  };

  const closeModal = () => {
    setSelectedImage(null); 
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery articles={articles} onImageClick={openModal} />
      {articles.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && <ImageModal image={selectedImage} onRequestClose={closeModal} />}
    </>
  );
}

export default App;
