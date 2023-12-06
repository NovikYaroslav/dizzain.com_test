import { useEffect } from 'react';
import PopupForm from '../Popup-form/Popup-form';
import { useReviews } from '../../context/reviewsContext';
import { ESC_KEY_CODE } from '../../utils/const';
import './popup.css';

export default function Popup() {
  const { isPopupOpen, tooglePopupVisability } = useReviews();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === ESC_KEY_CODE && isPopupOpen) {
        tooglePopupVisability();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPopupOpen, tooglePopupVisability]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      tooglePopupVisability();
    }
  };

  return (
    <div className={`popup ${isPopupOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <PopupForm />
    </div>
  );
}
