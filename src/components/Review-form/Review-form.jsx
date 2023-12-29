import { useState } from 'react';
import ReviewDatePiker from '../Review-date-piker/Review-date-piker';
import { useReviews } from '../../context/reviewsContext';
import { starsCount } from '../../utils/data';
import upload from '../../img/upload.png';
import './review-form.css';

// Most simple valdation

export default function ReviewForm({ location, rating, onFormSubmit, onMain }) {
  const { addReview } = useReviews();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [review, setReview] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [formSubmited, setFromSubmited] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleDateChange = (dateData) => setDate(dateData.$d);
  const handleReviewChange = (e) => setReview(e.target.value);
  const handleStarCheckboxChange = (star) => {
    setSelectedStars(star);
  };

  function clearStates() {
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setReview('');
    setSelectedStars('');
  }

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles).map((file) => ({
        file,
        name: file.name,
        path: URL.createObjectURL(file),
      }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onMain) {
      addReview(location, rating, name, email, phone, date, review, files);
      onFormSubmit();
    } else {
      addReview('', selectedStars, name, email, phone, date, review, []);
      clearStates();
      setFromSubmited(!formSubmited);
    }
  };

  return (
    <form className='review-form' onSubmit={handleSubmit}>
      {onMain ? (
        <h3 className='review-form__header'>
          Was something not right? Tell us here so that we can track and address any potential
          issues.{' '}
        </h3>
      ) : null}
      <div className='review-form__data-container'>
        <label className='review-form__input'>
          Name
          <input type='text' value={name} onChange={handleNameChange} required></input>
        </label>
        <label className='review-form__input'>
          Email
          <input type='email' value={email} onChange={handleEmailChange}></input>
        </label>
        <label className='review-form__input'>
          Phone number
          <input type='text' value={phone} onChange={handlePhoneChange} required></input>
        </label>
        <label className='review-form__input'>
          When were you with us?
          <ReviewDatePiker onDatePick={handleDateChange} formStatus={formSubmited} />
        </label>
      </div>
      {onMain ? null : (
        <div className='popup-form__rating-container'>
          {starsCount.map((star) => (
            <label
              key={star}
              className={`popup-form__rating-checkbox ${
                star <= selectedStars ? 'popup-form__rating-checkbox_checked' : ''
              }`}>
              <input
                type='checkbox'
                value={star}
                onChange={() => handleStarCheckboxChange(star)}
                checked={star <= selectedStars}
              />
            </label>
          ))}
        </div>
      )}
      <label className='review-form__input'>
        Review
        <textarea type='text-area' value={review} onChange={handleReviewChange} required></textarea>
      </label>
      {onMain ? (
        <label className='review-form__input_file'>
          <img src={upload} alt='скрепка' />
          {files.length > 0 ? (
            <ul className='review-form__files-names'>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          ) : (
            'Upload photo'
          )}
          <input type='file' onChange={handleFileChange} multiple accept='.jpg, .jpeg, .png' />
        </label>
      ) : null}

      <button className='review-form__submit' type='submit'>
        {onMain ? 'Send' : 'Save'}
      </button>
    </form>
  );
}
