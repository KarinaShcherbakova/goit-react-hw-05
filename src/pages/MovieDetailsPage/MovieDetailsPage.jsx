import { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2U5NmYyMzA1YmQ3N2I3NDgyMzlmYTViMzhkOTFiNSIsIm5iZiI6MTczMzY1NzAxMi43OCwic3ViIjoiNjc1NTgxYjRlM2I5YjNmOTE0NTUyZDk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PYonm2I1wsJHSWpU_Dh3ihFDIwd5iDypDF9LrDZeu2g';
  const navigate = useNavigate();
  const location = useLocation();
  const locationStateRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(locationStateRef.current);
  };

  return (
    <div className={styles.container}>
      {movie && (
        <>
          <button onClick={handleGoBack} className={styles.goBackButton}>Go Back</button>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>

          <div>
            <h2>
              <NavLink 
                to={`/movies/${movieId}/cast`} 
                className={styles.navLink} 
                activeClassName={styles.activeLink}
              >
                Cast
              </NavLink>
            </h2>
            <h2>
              <NavLink 
                to={`/movies/${movieId}/reviews`} 
                className={styles.navLink} 
                activeClassName={styles.activeLink}
              >
                Reviews
              </NavLink>
            </h2>
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;