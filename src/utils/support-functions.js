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

function formatDate(inputDate) {
  if (inputDate === 'Отсутствует' || /^\d{2}\.\d{2}\.\d{4}$/.test(inputDate)) {
    return inputDate;
  } else {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}.${
      month < 10 ? '0' + month : month
    }.${year}`;
    return formattedDate;
  }
}

function formatText(text) {
  const stringWithoutPTags = text.replace(/<p>|<\/p>|<br \/>|&#\d+;/g, '');
  return stringWithoutPTags;
}

export { shuffleArray, formatDate, formatText };
