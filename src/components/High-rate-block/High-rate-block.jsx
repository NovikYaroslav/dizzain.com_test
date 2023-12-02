import AggregatorCard from '../Aggregator-card/Aggregator-card';
import { aggregatorsData } from '../../utils/data';
import './high-rate-block.css';

export default function HighRateBlock({ location }) {
  return (
    <div className='high-rate-block'>
      <p className='high-rate-block__message'>
        {location.includes('Тринити')
          ? 'Выберите удобный сервис, чтобы оставить отзыв на ресторан Хинкальня в ТРК Тринити'
          : 'Вах! Как мы рады, что вам было вкусно и уютно! Вы можете оставить свой отзыв на удобном для вас сервисе'}
      </p>
      <div className='high-rate-block__aggregators-container'>
        {aggregatorsData
          // В макете выведено только 2, по заданию нужно вывести 3
          // Вывожу по заданию.
          // Если выводить 2, убираем flex-wrap из css и убираем Carte:
          // .filter((el) => el.name !== 'carte')
          .map((el) => (
            <AggregatorCard
              name={el.name}
              raiting={el.totalRate}
              reviewsAmount={el.reviewsAmount}
              link={el.ref}
              key={el.name}
            />
          ))}
      </div>
    </div>
  );
}
