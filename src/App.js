import React from 'react';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import AppRouters from './route/AppRouters';
import { ToastContainer } from 'react-toastify';

function App() {

  const isMobile = window.matchMedia('(max-width: 770px)').matches;

  if (isMobile) {
    return <p>This app is not supported on mobile devices.</p>;
  }

  return (
    <div className="App">
      <ToastContainer/>
      <AppRouters />
    </div>
  );
}

export default App;
