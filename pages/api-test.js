import { useState, useEffect } from 'react';
import styles from '../styles/ApiTest.module.css';

export default function ApiTest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch('/api/hello');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>API Test Page</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>API Response</h2>
        
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        {data && (
          <div className={styles.response}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

        <button 
          className={styles.button}
          onClick={fetchApiData}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
} 