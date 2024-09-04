import Modal from 'react-modal';
import './ImageModal.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    inset: 'auto', 
    border: 'none',
    padding: '0',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ image, onRequestClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
      className="modal-content"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      {image && (
        <img
          src={image.urls.regular}
          alt={image.description || 'Unsplash Image'}
          className="modal-image"
        />
      )}
    </Modal>
  );
};

export default ImageModal;
