import React, { useState, useEffect, createContext, useContext } from 'react';
import initialReviews from './test.json';
import { shuffleArray, formatDate } from '../utils/support-functions';

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsOnMain, setReviewsOnMain] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log(reviews);

  // Обновление отзывов на главной странице
  const updatedReviewsOnMain = () => {
    setReviewsOnMain(shuffleArray(reviews));
  };
  // Функция для добавления лайка.
  const updateLikes = (id) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, reviewLikesCount: review.reviewLikesCount + 1 } : review,
    );
    setReviews(updatedReviews);
  };

  // Функция для добавления нового отзыва
  const addReview = (location, rating, name, email, phone, date, review, files) => {
    console.log(rating);
    const newReview = {
      id: String(reviews.length + 1),
      location: location,
      title: name,
      email: email,
      phone: phone,
      date: formatDate(date),
      attachment: files,
      content: review,
      review: {
        reviewIsShowAtHomePage: rating > 3 ? true : false,
        reviewIsShowAtMobile: null,
        reviewLikesCount: 0,
        reviewRate: rating,
        reviewSource: 'home',
      },
    };
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
  const editReview = ({
    editedId,
    editedTitle,
    editedEmail,
    editedPhone,
    editedDate,
    editedReviewRate,
    editedContent,
  }) => {
    const updatedReviews = reviews.map((review) =>
      review.id === editedId
        ? {
            ...review,
            title: editedTitle,
            email: editedEmail,
            phone: editedPhone,
            date: editedDate,
            review: { ...review.review, reviewRate: editedReviewRate },
            content: editedContent,
          }
        : review,
    );
    setReviews(updatedReviews);
  };

  // Функция открытия popup
  const tooglePopupVisability = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    setReviews(initialReviews.reviews);
    setReviewsOnMain(shuffleArray(initialReviews.reviews));
  }, []);

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        reviewsOnMain,
        updateLikes,
        addReview,
        removeReview,
        editReview,
        updatedReviewsOnMain,
        isPopupOpen,
        tooglePopupVisability,
      }}>
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
