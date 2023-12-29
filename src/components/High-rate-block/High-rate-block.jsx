import AggregatorCard from '../Aggregator-card/Aggregator-card';
import { aggregatorsData } from '../../utils/data';
import './high-rate-block.css';

export default function HighRateBlock({ location }) {
  return (
    <div className='high-rate-block'>
      <p className='high-rate-block__message'>
        {location.includes('Trinity')
          ? 'Choose a convenient service to leave a review for the Hinkalnaya restaurant in the Trinity Shopping Mall.'
          : "Wow! We're delighted that you enjoyed the food and felt comfortable! You can leave your feedback on the service that suits you best."}
      </p>
      <div className='high-rate-block__aggregators-container'>
        {aggregatorsData.map((el) => (
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
