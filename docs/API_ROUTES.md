# Next.js API Routes Tutorial

## Understanding API Routes in Next.js

### 1. Basic Structure
```
nextjs-learning/
  ├── pages/
  │   ├── api/           # API routes directory
  │   │   └── hello.js   # This becomes /api/hello endpoint
  │   └── api-test.js    # Page that calls the API
```

### 2. How API Routes Work
- Any file inside `pages/api` becomes an API endpoint
- File name becomes the route path
- Example: `pages/api/hello.js` → `/api/hello` endpoint

### 3. Current Implementation

#### API Endpoint (`pages/api/hello.js`)
```javascript
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle the actual request
  res.status(200).json({ 
    message: 'Hello World!',
    timestamp: new Date().toISOString(),
    method: req.method
  });
}
```

#### Test Page (`pages/api-test.js`)
```javascript
const fetchApiData = async () => {
  try {
    const response = await fetch('/api/hello');  // Calls the API endpoint
    const result = await response.json();
    setData(result);
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};
```

### 4. Request Flow
1. User visits `/api-test`
2. Page loads and calls `fetchApiData()`
3. `fetch('/api/hello')` makes a request to the API
4. Next.js routes this to `pages/api/hello.js`
5. The handler function processes the request
6. Response is sent back to the page
7. Page displays the response

### 5. Key Concepts

#### API Route Handler
- Receives two parameters:
  - `req`: The request object
  - `res`: The response object
- Can handle different HTTP methods
- Can set headers and status codes
- Can send JSON responses

#### CORS Headers
- Allow cross-origin requests
- Set allowed methods
- Set allowed headers
- Handle preflight requests

#### Response Types
- JSON: `res.status(200).json({ data })`
- Text: `res.status(200).send('Hello')`
- Error: `res.status(500).json({ error })`

### 6. Testing the API
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:3000/api-test`
3. You should see:
   - API response data
   - Timestamp
   - Request method
4. Click "Refresh Data" to make new requests

### 7. Next Steps
1. [ ] Create POST endpoint
2. [ ] Add request validation
3. [ ] Implement error handling
4. [ ] Add database integration
5. [ ] Create dynamic routes

### 8. Common Use Cases
- Form submissions
- Database operations
- Authentication
- File uploads
- External API integration

### 9. Best Practices
- Use proper HTTP methods
- Implement error handling
- Set appropriate status codes
- Validate input data
- Add authentication when needed
- Handle CORS properly
- Use TypeScript for type safety

### 10. Resources
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 