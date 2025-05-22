import '../styles/globals.css';
import styles from '../styles/App.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp; 