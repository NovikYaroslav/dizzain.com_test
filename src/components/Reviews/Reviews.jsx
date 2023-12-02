import AggregatorCard from '../../components/Aggregator-card/Aggregator-card';
import Review from '../../components/Review/Review';
import { aggregatorsData } from '../../utils/data';
import { shuffleArray } from '../../utils/support-functions';
import { AMOUNT_ON_PAGE } from '../../utils/const';
import './Reviews.css';
import { useReviews } from '../../context/reviewsContext';

export default function Reviews() {
  const { reviewsOnMain } = useReviews();
  const randomReviews = reviewsOnMain.slice(0, AMOUNT_ON_PAGE);

  return (
    <section className='reviews'>
      <h1 className='reviews__title'>Отзывы</h1>

      <div className='reviews__bar'>
        {aggregatorsData.map((el) => (
          <AggregatorCard
            name={el.name}
            raiting={el.totalRate}
            reviewsAmount={el.reviewsAmount}
            key={el.name}
          />
        ))}
        <button className='reviews__button' type='button'>
          Оставить отзыв
        </button>
      </div>

      <div className='reviews__list'>
        {randomReviews.map((el) => (
          <Review
            author={el.title}
            text={el.content}
            likes={el.review.reviewLikesCount}
            id={el.id}
            key={el.id}
          />
        ))}
      </div>
    </section>
  );
}
