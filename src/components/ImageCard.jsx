const ImageCard = ({ article }) => {
  return (
    <div className="image-card">
      <img src={article.urls.small} alt={article.description || 'Unsplash Image'} />
      <p>{article.user.name}</p>
    </div>
  );
};

export default ImageCard;
