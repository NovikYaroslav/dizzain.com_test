import React, { useState, useEffect, createContext, useContext } from 'react';
import initialReviews from './test.json';
import { shuffleArray } from '../utils/support-functions';

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsOnMain, setReviewsOnMain] = useState([]);

  // Функция для добавления лайка.
  const updateLikes = (id) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, reviewLikesCount: review.reviewLikesCount + 1 } : review,
    );
    setReviews(updatedReviews);
  };

  // Функция для добавления нового отзыва
  const addReview = (newReview) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
  };

  // Функция для удаления отзыва
  const removeReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  // Функция для редактирования отзыва.
  // Нужно добавить возможность редактировать:
  // name / email / phone / data / raiting /
  const editReview = (id, newText) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, text: newText } : review,
    );
    setReviews(updatedReviews);
  };

  useEffect(() => {
    setReviews(initialReviews.reviews);
    setReviewsOnMain(shuffleArray(initialReviews.reviews));
  }, []);

  return (
    <ReviewsContext.Provider
      value={{ reviews, reviewsOnMain, updateLikes, addReview, removeReview, editReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews должен быть использован в компоненте, обернутом в ReviewsProvider');
  }
  return context;
};

export { ReviewsProvider, useReviews };
