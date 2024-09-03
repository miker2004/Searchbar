import ImageCard from './ImageCard';
import './ImageGallery.css'

const ImageGallery = ({ articles }) => {
  return (
    <ul className="image-gallery">
      {articles.map((article) => (
        <li key={article.id} className="image-card">
          <ImageCard article={article} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
