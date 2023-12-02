import { useEffect } from 'react';
import { useReviews } from '../../context/reviewsContext';
import PopupForm from '../Popup-form/Popup-form';
import './popup.css';

export default function Popup() {
  const { isPopupOpen, tooglePopupVisability } = useReviews();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27 && isPopupOpen) {
        tooglePopupVisability();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPopupOpen, tooglePopupVisability]);

  return (
    <div className={`popup ${isPopupOpen ? 'popup_opened' : ''}`}>
      <PopupForm />
    </div>
  );
}
