import { useReviews } from '../../context/reviewsContext';
import dancer from '../../img/Dancer.png';
import './review-submited-block.css';

export default function ReviewSubmitedBlock() {
  const { tooglePopupVisability } = useReviews();
  return (
    <div className='review-submited-block'>
      <h3 className='review-submited-block__message'>Спасибо за ваше мнение!</h3>
      <img className='review-submited-block__image' src={dancer} alt='Танцор' />
      <button className='review-submited-block__back-button' onClick={tooglePopupVisability}>
        Вернуться на главную
      </button>
      <a className='review-submited-block__menu-link' href='/menu'>
        Открыть меню
      </a>
    </div>
  );
}
