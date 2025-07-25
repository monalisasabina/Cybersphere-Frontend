import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import NavBar from './Components/NavBar'
import './App.css'
import AdminNavBar from './Components/AdminNavBar';

function App() {

  const navigate = useNavigate();

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

  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = token



  return (
    <>
      <NavBar/>
 
      {isAdmin && <AdminNavBar />}

      <Outlet/>
    </>
  )
}

export default App