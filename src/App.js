import './App.css';
import Login from './Component/Login';
import LandingPage from './Component/LandingPage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Head from './Component/Head';
import SettingsPage from './Component/SettingsPage';


function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Home' element={<Head/>}/>
          <Route path='/Home/Settings' element={<SettingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
