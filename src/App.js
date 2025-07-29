import './App.css';
import Login from './Component/Login';
import LandingPage from './Component/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Head from './Component/Head';
import SettingsPage from './Component/SettingsPage';
import MainContainer from './Component/MainContainer';
import CompletedPage from './Component/CompletedPage';
import OngoingPage from './Component/OngoingPage';
import Sidebar from './Component/Sidebar';


function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Home' element={
            <div className="flex flex-col h-full">
              <Head />
              <MainContainer />
            </div>
          } />
          <Route path='/Home/Settings' element={
            <div className="flex flex-col h-full">
              <Head />
              <SettingsPage />
            </div>
          } />
          <Route path='/completed' element={
            <div className="flex flex-col h-full">
              <CompletedPage />
            </div> 
          } />
          <Route path='/ongoing' element={
            <div className="flex flex-col h-full">
              <Head />
               <div className="flex flex-1">
                  <Sidebar />
                  <OngoingPage />
                </div>
              </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;