import './App.css';
import Login from './Pages/LoginPage/Login';
import LandingPage from './Pages/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Head from './Component/Head/Head';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import MainContainer from './Component/MainContainer';
import CompletedPage from './Pages/CompletedProjects/CompletedPage';
import OngoingPage from './Pages/OngoingProjects/OngoingPage';
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