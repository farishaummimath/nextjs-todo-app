import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Show loading state while the page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>This is the content for {slug}</p>
      
      {/* Router information */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h3>Router Information:</h3>
        <p>Current Path: {router.asPath}</p>
        <p>Route: {router.route}</p>
        <p>Query Parameters: {JSON.stringify(router.query)}</p>
      </div>

      <nav style={{ marginTop: '20px' }}>
        <button onClick={() => router.back()}>Go Back</button>
        <button onClick={() => router.push('/blog')}>Back to Blog</button>
        <button onClick={() => router.push('/')}>Go Home</button>
      </nav>
    </div>
  );
} 