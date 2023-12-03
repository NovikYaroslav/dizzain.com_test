import { useNavigate } from 'react-router-dom';
import ReviewForm from '../../components/Review-form/Review-form';
import ReviewsTable from '../../components/Reviews-table/Reviews-table';
import './review-control.css';

export default function ReviewsControl() {
  const navigate = useNavigate();
  function handleBackClick() {
    navigate('/');
  }
  return (
    <section className='review-control'>
      <button
        className='review-control__return-button'
        onClick={handleBackClick}
        type='button'></button>
      <div className='review-control__form'>
        <ReviewForm onMain={false} />
      </div>
      <ReviewsTable />
    </section>
  );
}
