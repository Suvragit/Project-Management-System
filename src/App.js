import "./App.css";
import Login from "./Pages/LoginPage/Login";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Head from "./Component/Head/Head";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import MainContainer from "./Pages/HomePage/MainContainer";
import CompletedPage from "./Pages/CompletedProjects/CompletedPage";
import OngoingPage from "./Pages/OngoingProjects/OngoingPage";
import Sidebar from "./Component/Sidebar/Sidebar";
import NoticeBoard from "./Pages/NoticeBoard/Notice";
import UpcomingPage from "./Pages/UpcomingPage/UpcomingPage";
import ContactUs from "./Pages/ContactUs/Contact";
import ViewSkill from "./Pages/Skillset/ViewSkill";
import EditSkill from "./Pages/Skillset/EditSkill";
import WishlistPage from "./Pages/Wishlist/WishlistPage";
import AdminOngoingPage from "./Pages/AdminOngoingProjects/AdminOngoingPage";
import MemberDetails from "./Pages/AdminOngoingProjects/MemberDetails";
import SearchResults from "./Component/Head/SearchResults";
import SignUp from "./Pages/SignUp/SignUp";
import BadgesEarned from "./Pages/BadgesEarned/BadgesEarned";
import EmailNotification from "./Pages/EmailNotification/EmailNotification";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/Home/*"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <MainContainer />
              </div>
            }
          />

          <Route
            path="/Home/Settings"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <SettingsPage />
              </div>
            }
          />

          <Route
            path="/search"
            element={
              <div>
                <Head />
                <SearchResults />
              </div>
            }
          />

          <Route
            path="/completed"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <CompletedPage />
                </div>
              </div>
            }
          />

          <Route
            path="/ongoing"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <OngoingPage />
                </div>
              </div>
            }
          />

          <Route
            path="/ongoingproject"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <AdminOngoingPage />
                </div>
              </div>
            }
          />

          <Route
            path="/ongoingproject/memberdetails"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <MemberDetails/>
                </div>
              </div>
            }
          />

          <Route
            path="/upcoming"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <UpcomingPage />
                </div>
              </div>
            }
          />

          <Route
            path="/skillset"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <ViewSkill />
                </div>
              </div>
            }
          />

          <Route
            path="/skillset/addskills"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <EditSkill />
                </div>
              </div>
            }
          />

          <Route
            path="/notice"
            element={
              <div className="flex flex-col h-full">
                <NoticeBoard />
              </div>
            }
          />

          <Route
            path="/Contact"
            element={
              <div className="flex flex-col h-full">
                <ContactUs />
              </div>
            }
          />

          <Route
            path="/Wishlist"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <WishlistPage />
                </div>
              </div>
            }
          />

            <Route
            path="/notifications"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <EmailNotification />
                </div>
              </div>
            }
          />

            <Route
            path="/badges"
            element={
              <div className="flex flex-col h-full">
                <Head />
                <div className="flex flex-1">
                  <Sidebar />
                  <BadgesEarned />
                </div>
              </div>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
