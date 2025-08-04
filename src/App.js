import './App.css';
import Login from './Pages/LoginPage/Login';
import LandingPage from './Pages/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Head from './Component/Head/Head';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import MainContainer from './Pages/HomePage/MainContainer';
import CompletedPage from './Pages/CompletedProjects/CompletedPage';
import OngoingPage from './Pages/OngoingProjects/OngoingPage';
import Sidebar from './Component/Sidebar/Sidebar';
import NoticeBoard from './Pages/NoticeBoard/Notice';
import UpcomingPage from './Pages/UpcomingPage/UpcomingPage';


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
          <Route path='/upcoming' element={
            <div className="flex flex-col h-full">
              <Head />
               <div className="flex flex-1">
                  <Sidebar />
                  <UpcomingPage />
                </div>
              </div>
          } />
          <Route path='/notice' element={
            <div className="flex flex-col h-full">
              <NoticeBoard/>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;