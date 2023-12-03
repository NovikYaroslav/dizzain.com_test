import { ReviewsProvider } from '../../context/reviewsContext';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import ReviewsControl from '../../pages/Reviews-control/Reviews-control';

export default function App() {
  return (
    <ReviewsProvider>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/setup' element={<ReviewsControl />} />
      </Routes>
    </ReviewsProvider>
  );
}
