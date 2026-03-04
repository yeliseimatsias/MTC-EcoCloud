import './css/Modal.css';
import Button from './Button'; // Проверь путь к кнопке!

const Modal = ({ isOpen, onClose, title, children }) => {
  // Если isOpen === false, React просто проигнорирует этот блок
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-x" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>

        <div className="modal-footer">
          {/* Используем наш компонент Button */}
          <Button variant="secondary" onClick={onClose}>ОТМЕНА</Button>
          <Button variant="primary">ПОДТВЕРДИТЬ</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;