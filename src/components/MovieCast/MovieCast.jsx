import { useOutletContext } from 'react-router-dom';
import styles from './MovieCast.module.css'; 

const MovieCast = () => {
  const { cast } = useOutletContext();

  return (
    <div className={styles.castContainer}>
      <h3 className={styles.castTitle}>Cast:</h3>
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