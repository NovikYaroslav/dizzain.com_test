import { useState } from 'react';
import { useReviews } from '../../context/reviewsContext';
import { restaurantAddresses } from '../../utils/data';
import { starsCount } from '../../utils/data';
import '../../components/Popup-form/popup-form.css';
import HighRateBlock from '../High-rate-block/High-rate-block';
import ReviewForm from '../Review-form/Review-form';

export default function PopupForm() {
  const { tooglePopupVisability } = useReviews();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);

  const handleCheckboxChange = (location) => {
    if (selectedLocation === location) {
      setSelectedLocation('');
    } else {
      setSelectedLocation(location);
    }
  };

  const handleStarCheckboxChange = (star) => {
    setSelectedStars(star);
  };

  return (
    <>
      <div className='popup-form'>
        <button
          className='popup-form__close'
          type='button'
          onClick={tooglePopupVisability}></button>
        <h3 className='popup-form__header-location'>В каком ресторане вы были?</h3>
        <div className='popup-form__locations-container'>
          {restaurantAddresses.map((address) => (
            <label
              className={`popup-form__location-checkbox ${
                selectedLocation === address ? 'popup-form__location-checkbox_checked' : ''
              }`}
              key={address}>
              <input type='checkbox' onChange={() => handleCheckboxChange(address)} />
              <div
                className={`popup-form__location-custom-checkbox ${
                  selectedLocation === address ? 'popup-form__location-custom-checkbox_checked' : ''
                }`}></div>
              {address}
            </label>
          ))}
        </div>
        {selectedLocation ? (
          <>
            <h3 className='popup-form__header-rating'>Ваша оценка</h3>
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
          </>
        ) : null}
        {selectedStars > 3 ? <HighRateBlock location={selectedLocation} /> : null}
        {selectedStars < 4 && selectedStars !== 0 ? <ReviewForm /> : null}
      </div>
    </>
  );
}
