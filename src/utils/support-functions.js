function filterForMainPage(reviews) {
  return reviews.filter((review) => review.review.reviewIsShowAtHomePage);
}

function shuffleArray(test) {
  const checkedReviews = filterForMainPage(test);
  for (let i = checkedReviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [checkedReviews[i], checkedReviews[j]] = [checkedReviews[j], checkedReviews[i]];
  }
  return checkedReviews;
}

export { shuffleArray };
