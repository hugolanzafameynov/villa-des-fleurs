import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
    </div>
);

export default NotFoundPage;
