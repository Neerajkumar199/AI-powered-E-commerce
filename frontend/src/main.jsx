import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this line
import AuthContext from './context/authContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthContext>
       <App />
     </AuthContext>
    </BrowserRouter>
  </StrictMode>
);
