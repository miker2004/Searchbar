const ImageCard = ({ article, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <img className="imgs-gallery" src={article.urls.small} alt={article.description || 'Unsplash Image'} />
    </div>
  );
};

export default ImageCard;
