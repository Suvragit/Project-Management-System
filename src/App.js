import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import MainContainer from './Component/MainContainer';
import React from 'react';
import LandingPage from './Component/LandingPage';
import { Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/main' element={<MainContainer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
