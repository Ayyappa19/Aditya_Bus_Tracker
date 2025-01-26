import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GetMyBus from './pages/get_my_bus/gmb/gmb';
import LiveTracking from './pages/live_tracking/live_main/lt';
import TransportIssues from './pages/transport_issues/ti';
import Err404 from './pages/Err404/Err404';
import UserProfile from './pages/user_profile/user';
import BusCoordinatorCards from './pages/bus_coordinator/bc';
import { HomePage } from './pages/home/home';
import Login from './pages/login/logine';
import LayoutWithSideNav from './pages/layout/LayoutWithSideNav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<LayoutWithSideNav />}>
          <Route path="get-my-bus" element={<GetMyBus />} />
          <Route path="live-tracking" element={<LiveTracking />} />
          <Route path="transport-issues" element={<TransportIssues />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="bus-coordinators" element={<BusCoordinatorCards />} />
          <Route path="home-page" element={<HomePage />} />
        </Route>

        <Route path="*" element={<Err404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
