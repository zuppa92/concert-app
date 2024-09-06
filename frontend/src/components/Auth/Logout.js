import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ logout }) {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return null;
}

export default Logout;