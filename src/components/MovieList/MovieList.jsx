import { NavLink } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => (
  <ul className={styles.movieList}>
    {movies.map(movie => (
      <li key={movie.id} className={styles.movieItem}>
        <NavLink to={`/movies/${movie.id}`} className={styles.movieLink}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.movieImage}
          />
          <h2 className={styles.movieTitle}>{movie.title}</h2>
        </NavLink>
      </li>
    ))}
  </ul>
);

export default MovieList;