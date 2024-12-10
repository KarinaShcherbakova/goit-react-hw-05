import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false); 
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2U5NmYyMzA1YmQ3N2I3NDgyMzlmYTViMzhkOTFiNSIsIm5iZiI6MTczMzY1NzAxMi43OCwic3ViIjoiNjc1NTgxYjRlM2I5YjNmOTE0NTUyZDk1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PYonm2I1wsJHSWpU_Dh3ihFDIwd5iDypDF9LrDZeu2g';
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const searchQuery = searchParams.get('query') || ''; 
  
  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: { query: searchQuery, page: 1 },
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });

        if (response.data.results.length === 0) {
          setNoResults(true); 
          setMovies([]);  
        } else {
          setMovies(response.data.results);
          setNoResults(false);  
        }
      } catch {
        setError('Error fetching data');
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.query.value.trim();
    if (query) {
      setSearchParams({ query }); 
    }
  };

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.container}>
      <button className={styles.goBackButton} onClick={goBack}>
        Go Back
      </button>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search for movies..."
          autoComplete="off"
          defaultValue={searchQuery} 
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {noResults && !error && (
        <p className={styles.noResults}>No movies found. Try a different search.</p>
      )}

      <div className={styles.movies}>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MoviesPage;