import React, { useState, useEffect, createContext, useContext } from 'react';
import initialReviews from './initial.json';
import { shuffleArray, formatDate } from '../utils/support-functions';

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsOnMain, setReviewsOnMain] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Вот подход сохранения, через диалоговое окно. Работает, сохраняет, перезаписывает.
  // Без диалогового окна, я возможности перезаписи не вижу.
  // Если перезаписывать изначальный json, приложение при перезаписи будет перезапускать, видимо из за обновления импорта.
  // Поэтому, создан initial.json, а создается и перезаписывается test.json
  async function saveJson(reviews) {
    try {
      const reviewsString = JSON.stringify({ reviews });
      const root = await window.showDirectoryPicker();
      const fileHandle = await root.getFileHandle('test.json', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(reviewsString);
      await writable.close();

      console.log('Файл сохранен!');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  const updatedReviewsOnMain = () => {
    setReviewsOnMain(shuffleArray(reviews));
  };

  const updateLikes = (id) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, reviewLikesCount: review.reviewLikesCount + 1 } : review,
    );
    setReviews(updatedReviews);
    saveJson(updatedReviews);
  };

  const addReview = (location, rating, name, email, phone, date, review, files) => {
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
    saveJson(updatedReviews);
  };

  const removeReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
    saveJson(updatedReviews);
  };

  const editReview = ({
    editedId,
    editedTitle,
    editedEmail,
    editedPhone,
    editedDate,
    editedReviewRate,
    editedContent,
  }) => {
    console.log(editedDate);
    const updatedReviews = reviews.map((review) =>
      review.id === editedId
        ? {
            ...review,
            title: editedTitle,
            email: editedEmail,
            phone: editedPhone,
            date: formatDate(editedDate),
            review: { ...review.review, reviewRate: editedReviewRate },
            content: editedContent,
          }
        : review,
    );
    setReviews(updatedReviews);
    saveJson(updatedReviews);
  };

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
