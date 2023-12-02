import { useState } from 'react';
import { draftStars } from '../../utils/data';
import star from '../../img/Star-active.png';
import activeLike from '../../img/like-active.png';
import inactiveLike from '../../img/like-inactive.png';
import { useReviews } from '../../context/reviewsContext';
import './review.css';

export default function Review({ author, text, likes, id }) {
  const { updateLikes } = useReviews();
  const stringWithoutPTags = text.replace(/<p>|<\/p>|<br \/>|&#\d+;/g, '');
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
        {draftStars.map((el) => (
          <img src={star} alt='звездочка рейтинга' key={el} />
        ))}
      </div>
      <h2 className='review__author'>{author}</h2>
      <p className='review__text'>{stringWithoutPTags}</p>
      <button className='review__likes' type='button' onClick={handleLikeClick}>
        <img className='review__like' alt='' src={liked ? activeLike : inactiveLike} />
        {likeCount < 1 ? (
          <p className='review__like-label'>Нравится</p>
        ) : (
          <p className={`review__likes-amount ${!liked ? 'review__likes-amount_active' : ''}`}>
            {likeCount}
          </p>
        )}
      </button>
    </li>
  );
}
