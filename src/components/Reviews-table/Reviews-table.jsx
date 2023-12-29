import { useState } from 'react';
import { useReviews } from '../../context/reviewsContext';
import { formatText } from '../../utils/support-functions';
import { starsCount, tableColumns } from '../../utils/data';
import star from '../../img/big-star-active.png';
import inactiveStar from '../../img/big-star-inactive.png';
import './reviews-table.css';

export default function ReviewsTable() {
  const { reviews, removeReview, editReview } = useReviews();
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleEditClick = (id, review) => {
    setEditMode(id);
    setEditedValues({
      editedId: review.id,
      editedTitle: review.title,
      editedEmail: review.email || 'N/A',
      editedPhone: review.phone || 'N/A',
      editedDate: review.date || 'N/A',
      editedReviewRate: review.review.reviewRate,
      editedContent: review.content,
    });
  };

  const handleConfirmEditClick = () => {
    setEditMode(null);
    setEditedValues({});
    editReview(editedValues);
  };

  return (
    <table className='reviews-table'>
      <thead>
        <tr>
          {tableColumns.map((column) => (
            <th
              key={column}
              className={`reviews-table__heading ${
                column === 'Review' ? 'reviews-table__heading_review' : ''
              }`}>
              {column}
            </th>
          ))}
          <th className='reviews-table__heading'></th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td className='reviews-table__body'>
              {editMode === review.id ? (
                <textarea
                  className='reviews-table__input'
                  type='textarea'
                  value={editedValues.editedTitle}
                  onChange={(e) =>
                    setEditedValues({ ...editedValues, editedTitle: e.target.value })
                  }
                />
              ) : (
                review.title
              )}
            </td>
            <td className='reviews-table__body'>
              {editMode === review.id ? (
                <textarea
                  className='reviews-table__input'
                  type='textarea'
                  value={editedValues.editedEmail}
                  onChange={(e) =>
                    setEditedValues({ ...editedValues, editedEmail: e.target.value })
                  }
                />
              ) : (
                review.email || 'N/A'
              )}
            </td>
            <td className='reviews-table__body'>
              {editMode === review.id ? (
                <textarea
                  className='reviews-table__input'
                  type='textarea'
                  value={editedValues.editedPhone}
                  onChange={(e) =>
                    setEditedValues({ ...editedValues, editedPhone: e.target.value })
                  }
                />
              ) : (
                review.phone || 'N/A'
              )}
            </td>
            <td className='reviews-table__body reviews-table__body_edit'>
              {editMode === review.id ? (
                <input
                  className='reviews-table__input'
                  type='date'
                  onChange={(e) => setEditedValues({ ...editedValues, editedDate: e.target.value })}
                />
              ) : (
                review.date || 'N/A'
              )}
            </td>
            <td className='reviews-table__body'>
              {editMode === review.id ? (
                <input
                  className='reviews-table__input'
                  type='number'
                  max={5}
                  min={1}
                  value={editedValues.editedReviewRate}
                  onChange={(e) =>
                    setEditedValues({ ...editedValues, editedReviewRate: e.target.value })
                  }
                />
              ) : (
                starsCount.map((starNumber) => (
                  <img
                    className='review-table__stars'
                    src={starNumber <= review.review.reviewRate ? star : inactiveStar}
                    alt='rating star'
                    key={starNumber}
                  />
                ))
              )}
            </td>
            <td className='reviews-table__body'>
              {editMode === review.id ? (
                <textarea
                  className='reviews-table__input reviews-table__input_review '
                  type='textarea'
                  value={editedValues.editedContent}
                  onChange={(e) =>
                    setEditedValues({ ...editedValues, editedContent: e.target.value })
                  }
                />
              ) : (
                formatText(review.content)
              )}
            </td>
            <td className='reviews-table__body'>
              {editMode === review.id ? (
                <button className='reviews-table__buttons' onClick={handleConfirmEditClick}>
                  Confirm
                </button>
              ) : (
                <button
                  className='reviews-table__buttons'
                  onClick={() => handleEditClick(review.id, review)}>
                  Edit
                </button>
              )}
            </td>
            <td className='reviews-table__body'>
              <button
                className='reviews-table__buttons'
                type='button'
                onClick={() => removeReview(review.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
