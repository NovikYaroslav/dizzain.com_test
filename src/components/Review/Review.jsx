import { useState } from 'react';
import star from '../../img/Star-active.png';
import inactiveStar from '../../img/Star-inactive.png';
import activeLike from '../../img/like-active.png';
import inactiveLike from '../../img/like-inactive.png';
import { useReviews } from '../../context/reviewsContext';
import { starsCount } from '../../utils/data';
import { formatText } from '../../utils/support-functions';
import './review.css';

export default function Review({ author, text, rating, likes, id }) {
  const { updateLikes } = useReviews();
  const stringWithoutPTags = formatText(text);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    updateLikes(id);
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <li className='review'>
      <div className='review__label'></div>
      <div className='review__raiting'>
        {starsCount.map((starNumber) => (
          <img
            src={starNumber <= rating ? star : inactiveStar}
            alt='звездочка рейтинга'
            key={starNumber}
          />
        ))}
      </div>
      <h2 className='review__author'>{author}</h2>
      <p className='review__text'>{stringWithoutPTags}</p>
      <button className='review__likes' type='button' onClick={handleLikeClick}>
        <img className='review__like' alt='' src={liked ? activeLike : inactiveLike} />
        {likeCount < 1 ? (
          <p className='review__like-label'>Like</p>
        ) : (
          <p className={`review__likes-amount ${!liked ? 'review__likes-amount_active' : ''}`}>
            {likeCount}
          </p>
        )}
      </button>
    </li>
  );
}
