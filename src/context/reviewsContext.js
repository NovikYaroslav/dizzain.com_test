import React, { useState, useEffect, createContext, useContext } from 'react';
import initialReviews from './test.json';
import { shuffleArray, formatDate } from '../utils/support-functions';

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsOnMain, setReviewsOnMain] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // единственный приличный вариант который я вижу, для сохранения это localStorage.
  // fr не подходит, т.к. я не в node.js
  // File System Access API требует взаимодействия с клиентом и не предназначен для подкапотной перезаписи.
  // Получится должно было что-то такое:

  // useEffect(() => {
  //   saveJson();
  // }, [reviews]);

  // async function saveJson() {
  //   const reviewsString = JSON.stringify({ reviews });
  //   let blob = new Blob([reviewsString], { type: 'text/plain' });
  //   let fileName = `test`;
  //   let a = await window.showSaveFilePicker({
  //     suggestedName: `${fileName}.json`,
  //     types: [
  //       {
  //         description: 'test.json',
  //         accept: {
  //           'text/plain': ['.json'],
  //         },
  //       },
  //     ],
  //   });
  //   let b = await a.createWritable();
  //   let c = await b.write(blob);
  //   let d = await b.close();
  // }

  // возможно есть способы работы с файлом через public или средствами для перезаписи файлов библиотек, но это какая-то черная магия.

  useEffect(() => {
    const reviewsString = JSON.stringify({ reviews });
    localStorage.setItem('test.json', reviewsString);
  }, [reviews]);

  const updatedReviewsOnMain = () => {
    setReviewsOnMain(shuffleArray(reviews));
  };

  const updateLikes = (id) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, reviewLikesCount: review.reviewLikesCount + 1 } : review,
    );
    setReviews(updatedReviews);
  };

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

  const removeReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
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
