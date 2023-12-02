import upload from '../../img/upload.png';
import './review-form.css';

export default function ReviewForm() {
  return (
    <form className='review-form'>
      <h3 className='review-form__header'>
        Что-то было не так? Расскажите об этом здесь, чтобы мы могли отследить и решить возможные
        проблемы{' '}
      </h3>
      <div className='review-form__data-container'>
        <label className='review-form__input'>
          Имя
          <input type='text'></input>
        </label>
        <label className='review-form__input'>
          Email
          <input type='text'></input>
        </label>
        <label className='review-form__input'>
          Телефон
          <input type='text'></input>
        </label>
        <label className='review-form__input'>
          Когда вы у нас были?
          <input type='date'></input>
        </label>
      </div>
      <label className='review-form__input'>
        Отзыв
        <textarea type='text-area'></textarea>
      </label>
      <label className='review-form__input_file'>
        <img src={upload} />
        Загрузите фотографии
        <input type='file'></input>
      </label>
      <button className='review-form__submit' type='submit'>
        Отправить
      </button>
    </form>
  );
}
