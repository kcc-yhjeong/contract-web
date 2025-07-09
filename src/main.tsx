import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './app/index';
import { router } from './app/routes';

// import './app/globals.css';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
    // </React.StrictMode>
);
