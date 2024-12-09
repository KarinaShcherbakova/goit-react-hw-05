import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('popular'); 

  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2U5NmYyMzA1YmQ3N2I3NDgyMzlmYTViMzhkOTFiNSIsIm5iZiI6MTczMzY1NzAxMi43OCwic3ViIjoiNjc1NTgxYjRlM2I5YjNmOTE0NTUyZDk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PYonm2I1wsJHSWpU_Dh3ihFDIwd5iDypDF9LrDZeu2g';

  const fetchMovies = async (category = 'popular') => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(category);
  }, [category]);

  return (
    <div className={styles.container}>
      <h1>Welcome to Movie Database</h1>

      <nav>
        <NavLink 
          to="/" 
          className={styles.navLink} 
          onClick={() => setCategory('popular')} 
          activeClassName={styles.activeLink}
        >
          Home
        </NavLink>
        <NavLink 
          to="/movies" 
          className={styles.navLink} 
          onClick={() => setCategory('popular')} 
          activeClassName={styles.activeLink}
        >
          Movies
        </NavLink>
        <NavLink 
          to="/" 
          className={styles.navLink} 
          onClick={() => setCategory('trending/day')} 
          activeClassName={styles.activeLink}
        >
          Trending Today
        </NavLink>
      </nav>

      <h2>{category === 'trending/day' ? 'Trending Today' : 'Popular Movies'}</h2>
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
