import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2U5NmYyMzA1YmQ3N2I3NDgyMzlmYTViMzhkOTFiNSIsIm5iZiI6MTczMzY1NzAxMi43OCwic3ViIjoiNjc1NTgxYjRlM2I5YjNmOTE0NTUyZDk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PYonm2I1wsJHSWpU_Dh3ihFDIwd5iDypDF9LrDZeu2g`, 
            },
          }
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch reviews data: ${err.message}`);
        setLoading(false);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.reviewsTitle}>Reviews:</h3>
      {loading && <p className={styles.loading}>Loading reviews...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {reviews.length === 0 && !loading ? (
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