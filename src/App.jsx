import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import Navigation from './components/Navigation/Navigation'; 
import styles from './App.module.css';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = React.lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = React.lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = React.lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;