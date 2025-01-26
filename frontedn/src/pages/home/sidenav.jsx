import React, { useState, useRef } from 'react';
import './SideNav.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';



// Define a mapping of menu items to their images
const menuImages = {
    'Home': 'https://img.icons8.com/ios/452/home.png',  // Home icon
    'Get Bus': 'https://img.icons8.com/ios/452/bus.png',  // Get Bus icon
    'Live Track': 'https://img.icons8.com/ios/452/route.png',  // GPS Tracking icon
    'Issues': 'https://img.icons8.com/ios/452/map-marker.png',  // Directions icon
    'Profile': 'https://img.icons8.com/ios/452/user.png',  // Profile icon
};

const Routes = {
    'Home' : '/home-page',
    'Get Bus' : '/get-my-bus',
    'Live Track' : '/live-tracking',
    'Issues' : '/transport-issues',
    'Profile' : '/user-profile'
}


const SideNav = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Refs for elements
    const sidenavRef = useRef(null);
    // const pnameRef = useRef(null);
    const togglerRef = useRef(null);
    const togglerIconRef = useRef(null);
    const menuNamesRef = useRef([]);
    const navigate = useNavigate();
    const menuName = useRef(null);
    const pimg = useRef(null)

    const toggle = () => {
        if (isCollapsed) {
            // Expand the sidebar
            sidenavRef.current.style.width = "170px";
            pimg.current.style.width = '90px';
            pimg.current.style.height = '90px';
            // pnameRef.current.style.display = "flex";
            togglerRef.current.style.background = "linear-gradient(90deg, white 50%, rgba(206, 191, 191, 0) 50%)";
            togglerIconRef.current.src = "https://img.icons8.com/metro/26/back.png";
            togglerIconRef.current.style.margin = "auto";
            togglerIconRef.current.style.marginLeft = "5px";
            menuNamesRef.current.forEach(el => el.style.display = 'flex');
        } else {
            // Collapse the sidebar
            sidenavRef.current.style.width = "45px";
            // pnameRef.current.style.display = "none";
            pimg.current.style.width = '40px';
            pimg.current.style.height = '40px';
            menuName.current.style.display = "none";
            togglerRef.current.style.background = "linear-gradient(90deg, rgba(206, 191, 191, 0) 50%, white 50%)";
            togglerIconRef.current.src = "https://img.icons8.com/metro/26/forward.png";
            togglerIconRef.current.style.margin = "auto";
            togglerIconRef.current.style.marginRight = "5px";
            menuNamesRef.current.forEach(el => el.style.display = 'none');
        }
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>     
        <div ref={sidenavRef} className={`darksoul-sidenav ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="homee_header">
                <div className="home_profile">
                    <div className="home_profile-pic" ref={pimg}>
                    </div>
                </div>
                <div className="home_btn">
                    <div ref={togglerRef} className="circle" onClick={toggle}>
                        <img ref={togglerIconRef} width="10" height="10" src={isCollapsed ? "https://img.icons8.com/metro/26/forward.png" : "https://img.icons8.com/metro/26/back.png"} alt="toggle icon" />
                    </div>
                </div>
            </div>
            <div className="home_menus">
                <p ref={menuName}>Menu</p>
                <div className="home_menu-container">
                    {['Home', 'Get Bus','Live Track','Issues','Profile'].map((menu, index) => (
                        <div key={index} className="home_menu" onClick={()=>{navigate(Routes[menu])}}>
                            <div className="home_menu-img">
                                <img src={menuImages[menu]} alt={menu} width="25" height="25" />
                            </div>
                            <div ref={el => menuNamesRef.current[index] = el} className="home_menu-name">
                                <a><p>{menu}</p></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>

    );
};

export default SideNav;
