import { useOutletContext } from 'react-router-dom';
import styles from './MovieReviews.module.css'; 

const MovieReviews = () => {
  const { reviews } = useOutletContext(); 

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.reviewsTitle}>Reviews:</h3>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews available.</p>
      ) : (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewsListItem}>
              <p>
                <span className={styles.reviewsAuthor}>{review.author}:</span>
                <span className={styles.reviewsContent}> {review.content}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;