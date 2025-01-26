// components/LayoutWithSideNav.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../home/sidenav';
import HomeNavigation from "../home/mobile_nav"

const LayoutWithSideNav = () => {
    return (
        <div className="layout">
            {/* Fixed SideNav */}
            {
                window.innerWidth <= 500 ? <HomeNavigation/> : <SideNav />
            }

            {/* Main Content Area */}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutWithSideNav;
