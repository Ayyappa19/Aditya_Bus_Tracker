import React, { useState } from 'react';
import './home_Navigation.css'; // Ensure this file includes your CSS
import { useNavigate } from 'react-router-dom';

const HomeNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const menuImages = {
    'Home': 'https://img.icons8.com/ios/452/home.png',  // Home icon
    'Get Bus': 'https://img.icons8.com/ios/452/bus.png',  // Get Bus icon
    'Track': 'https://img.icons8.com/ios/452/route.png',  // GPS Tracking icon
    'Issues': 'https://img.icons8.com/ios/452/map-marker.png',  // Directions icon
    'Profile': 'https://img.icons8.com/ios/452/user.png',  // Profile icon
  };

  const Routes = {
    'Home': '/home-page',
    'Get Bus': '/get-my-bus',
    'Track': '/live-tracking',
    'Issues': '/transport-issues',
    'Profile': '/user-profile'
  };

  const links = Object.keys(menuImages);

  return (
    <div className="Home_mobile_navigation">
      <ul>
        {links.map((link, index) => (
          <li
            key={index}
            className={`list ${activeIndex === index ? 'active' : ''}`}
            onClick={() => {
              setActiveIndex(index);
              navigate(Routes[link]);  // Navigate to the corresponding route
            }}
          >
            <a>
              <span className="Mobile_icon">
                <img src={menuImages[link]} alt={link} />
              </span>
              <span className="text">{link}</span>
            </a>
          </li>
        ))}
        <div className="home_indicator" style={{ transform: `translateX(${activeIndex * 70}px)` }}></div>
      </ul>
    </div>
  );
};

export default HomeNavigation;
