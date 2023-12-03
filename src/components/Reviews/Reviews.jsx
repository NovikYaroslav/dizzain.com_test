import AggregatorCard from '../../components/Aggregator-card/Aggregator-card';
import Review from '../../components/Review/Review';
import { aggregatorsData } from '../../utils/data';
import {
  AMOUNT_ON_PAGE,
  FIRST_SLICE,
  SECOND_SLICE,
  THIRD_SLICE,
  AMOUNT_IN_COLUMN,
} from '../../utils/const';
import { useReviews } from '../../context/reviewsContext';
import './Reviews.css';
import { useEffect } from 'react';

export default function Reviews() {
  const { reviewsOnMain, tooglePopupVisability, updatedReviewsOnMain } = useReviews();
  const randomReviews = reviewsOnMain.slice(0, AMOUNT_ON_PAGE);

  // Из за этого эффекта 2 раза получаем отзывы. 1- при старте, второй при ренедере компонента.
  useEffect(() => {
    updatedReviewsOnMain();
  }, []);

  return (
    <section className='reviews'>
      <h1 className='reviews__title'>Отзывы</h1>

      <div className='reviews__bar'>
        {aggregatorsData.map((el) => (
          <AggregatorCard
            name={el.name}
            raiting={el.totalRate}
            reviewsAmount={el.reviewsAmount}
            link={el.ref}
            key={el.name}
          />
        ))}
        <button className='reviews__button' type='button' onClick={tooglePopupVisability}>
          Оставить отзыв
        </button>
      </div>

      <div className='reviews__list'>
        {[FIRST_SLICE, SECOND_SLICE, THIRD_SLICE].map((startIndex) => (
          <div className='reviews__column' key={startIndex}>
            {randomReviews.slice(startIndex, startIndex + AMOUNT_IN_COLUMN).map((el) => (
              <Review
                author={el.title}
                text={el.content}
                rating={el.review.reviewRate}
                likes={el.review.reviewLikesCount}
                id={el.id}
                key={el.id}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
