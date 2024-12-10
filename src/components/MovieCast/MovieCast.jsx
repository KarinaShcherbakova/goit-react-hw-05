import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams(); 
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2U5NmYyMzA1YmQ3N2I3NDgyMzlmYTViMzhkOTFiNSIsIm5iZiI6MTczMzY1NzAxMi43OCwic3ViIjoiNjc1NTgxYjRlM2I5YjNmOTE0NTUyZDk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PYonm2I1wsJHSWpU_Dh3ihFDIwd5iDypDF9LrDZeu2g`, 
            },
          }
        );
        setCast(response.data.cast); 
      } catch (err) {
        console.error(err); 
        setError('Failed to fetch cast data'); 
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]); 

  return (
    <div className={styles.castContainer}>
      <h3 className={styles.castTitle}>Cast:</h3>
      {error && <p className={styles.error}>{error}</p>}  
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castListItem}>
            <p>
              <span className={styles.castActorName}>{actor.name}</span> as{' '}
              <span className={styles.castCharacterName}>{actor.character}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;