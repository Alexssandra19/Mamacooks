// Import necessary dependencies
import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Contents from './Contents.jsx';

// Your component rendering
const element = <Contents />;

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('contents'));

// Wrap your application with BrowserRouter
root.render(
  <Router>
    {element}
  </Router>
);
