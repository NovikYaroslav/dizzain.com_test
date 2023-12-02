import carteLogo from '../../img/Carte.png';
import yandexLogo from '../../img/Yandex.png';
import googleLogo from '../../img/Google.png';
import star from '../../img/Star-active.png';
import { draftStars } from '../../utils/data';
import './aggregator-card.css';

export default function AggregatorCard({ name, raiting, reviewsAmount }) {
  const logos = {
    yandex: yandexLogo,
    carte: carteLogo,
    google: googleLogo,
  };

  return (
    <div className='aggregator-card'>
      <div className='aggregator-card__left-side'>
        <img className='aggregator__logo' src={logos[name]} alt='логотип агрегатора' />
        <div className='aggregator__stars-raiting'>
          {draftStars.map((el) => (
            <img src={star} alt='здездочка рейтинга' key={el} />
          ))}
        </div>
      </div>
      <div className='aggregator-card__right-side'>
        <p className='aggregator__raiting'>{`${raiting.toFixed(1)}/5`}</p>
        <p className='aggregator__reviews-amount'>{`${reviewsAmount} отзывов`}</p>
      </div>
    </div>
  );
}
