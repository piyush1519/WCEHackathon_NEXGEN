import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const token = JSON.parse(data)?.token;

    if (token) {
      setIsAuthenticated(true);
      // Check if user is authenticated and on login or signup page
      if (
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signUp'
      ) {
        // Redirect to dashboard or home (depending on your app logic)
        navigate('/dashboard', { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
