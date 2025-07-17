import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import NavBar from './Components/NavBar'
import './App.css'


function App() {

  useEffect(() => {
  const handleKeyCombo = (e) => {
    
    console.log(e.key, e.ctrlKey, e.altKey)

    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") {
      window.location.href = "/login";
    }
  };
  window.addEventListener("keydown", handleKeyCombo);
  return () => window.removeEventListener("keydown", handleKeyCombo);
}, []);



  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App