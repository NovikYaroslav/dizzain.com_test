import { useEffect, useState } from 'react';
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

export default function Reviews() {
  const { reviewsOnMain, tooglePopupVisability, updatedReviewsOnMain } = useReviews();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [reviewsInColumn, setReviewsInColumn] = useState(2);
  const randomReviews = reviewsOnMain.slice(0, AMOUNT_ON_PAGE);
  const desktopSlices = [FIRST_SLICE, SECOND_SLICE, THIRD_SLICE];
  const tabletSlices = [FIRST_SLICE, SECOND_SLICE];
  const mobilSlices = [FIRST_SLICE];
  const [columnsAmount, setColumnsAmount] = useState(desktopSlices);

  console.log(columnsAmount);
  console.log(reviewsInColumn);
  console.log(windowWidth);

  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    updatedReviewsOnMain();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', () => setTimeout(handleResize, 3000));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1040) {
      setReviewsInColumn(3);
      setColumnsAmount(tabletSlices);
    }
    if (windowWidth < 640) {
      setReviewsInColumn(6);
      setColumnsAmount(mobilSlices);
    }

    if (windowWidth > 1040) {
      setReviewsInColumn(2);
      setColumnsAmount(desktopSlices);
    }
  }, [windowWidth]);

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
        {columnsAmount.map((startIndex) => (
          <div className='reviews__column' key={startIndex}>
            {randomReviews.slice(startIndex, startIndex + reviewsInColumn).map((el) => (
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
      {/* <div className='reviews__list'>
        {[FIRST_SLICE].map((startIndex) => (
          <div className='reviews__column' key={startIndex}>
            {randomReviews.slice(startIndex, startIndex + 6).map((el) => (
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
      </div> */}
    </section>
  );
}
