import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RouterDemo() {
  const router = useRouter();

  // Example of using router events
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`Route is changing to: ${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      <h1>Router Methods Demo</h1>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Navigation Methods</h2>
        <button onClick={() => router.push('/blog/first-post')}>
          Push to First Post
        </button>
        <button onClick={() => router.replace('/blog/second-post')}>
          Replace with Second Post
        </button>
        <button onClick={() => router.back()}>
          Go Back
        </button>
        <button onClick={() => router.reload()}>
          Reload Page
        </button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Prefetch Demo</h2>
        <button onClick={() => router.prefetch('/blog/third-post')}>
          Prefetch Third Post
        </button>
        <p>Check console to see prefetch completion</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Current Router Info</h2>
        <pre>
          {JSON.stringify({
            pathname: router.pathname,
            asPath: router.asPath,
            query: router.query
          }, null, 2)}
        </pre>
      </div>

      <nav>
        <a href="/">Go back home</a>
      </nav>
    </div>
  );
} 