import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import NavBar from './Components/NavBar'
import './App.css'
import AdminNavBar from './Components/AdminNavBar';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  // Accessing the LogIn page
  useEffect(() => {
  const handleKeyCombo = (e) => {
    console.log(e.key, e.ctrlKey, e.altKey);

    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") {
      navigate('/login');
    }
  };
  window.addEventListener("keydown", handleKeyCombo);
  return () => window.removeEventListener("keydown", handleKeyCombo);
  }, [navigate]);

  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App