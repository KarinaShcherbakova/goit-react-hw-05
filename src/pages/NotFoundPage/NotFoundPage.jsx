import { NavLink } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NavLink to="/" className={styles.link} activeClassName={styles.activeLink}>
        Go back to Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;