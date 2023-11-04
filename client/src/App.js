import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/navbar"
import Inventory from "./components/inventory"

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Inventory />
    </div>
  );
}

export default App;
