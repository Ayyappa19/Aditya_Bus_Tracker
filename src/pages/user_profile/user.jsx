import React from 'react';
import './user.css';
import { FaPhoneVolume } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Barcode from 'react-barcode';

const UserProfileShowcase = ({ userData, handleLogout }) => {
  const {
    name,
    rollNumber,
    mobileNumber,
    collegeMail,
    photo,
    userType,
    city,
    stop,
    busType,
    busNumber,
    busDriverName,
    activeStatus,
  } = userData;

  return (
    <div className="container">
      <div className="profileDisplay">
        <div className="userInfo">
          <img src={photo} alt="User" className="profilePhoto" />
          <div className="cdd">
            <b><h1 className="userName">{name}</h1></b>
            <div className="cd_bd"><CgProfile /><strong>Roll Number:</strong> {rollNumber}</div>
            <div className="cd_bd"><FaPhoneVolume /><strong>Mobile Number:</strong> {mobileNumber}</div>
            <div className="cd_bd"><IoMail /><strong>College Mail:</strong> {collegeMail}</div>
            <button onClick={handleLogout} className="logoutBtn">Logout</button>
          </div>
        </div>
        <div className="additionalInfo">
          <center><div className="subtitle">Additional Information</div></center>
          <div className="cd_bd1"><strong>Type:</strong> {userType === 'student' ? 'Student' : 'Faculty'}</div>
          <div className="cd_bd1"><strong>City:</strong> {city}</div>
          <div className="cd_bd1"><strong>Stop:</strong> {stop}</div>
          <div className="cd_bd1"><strong>Bus Type:</strong> {busType === 'collegeBus' ? 'College Bus' : 'Hosteller'}</div>
          <div className="cd_bd1"><strong>Bus Number:</strong> {busNumber}</div>
          <div className="cd_bd1"><strong>Driver Name:</strong> {busDriverName}</div>
          <div className="statusContainer">
            <strong>Status:</strong>
            <button
              className="statusBtn"
              style={{ backgroundColor: activeStatus ? 'green' : 'red' }}
            >
              {activeStatus ? 'Active' : 'Inactive'}
            </button>
          </div>
          <div className="barcodeContainer" >
            <center><Barcode className="barCode" value={rollNumber} /></center>
          </div>
        </div>
      </div>
    </div>
  );
};

const Apple1 = () => {
  const userData = {
    name: 'A.Sai Surya Harsha',
    rollNumber: '22A91A61D2',
    mobileNumber: '7893926569',
    collegeMail: 'saisuryaakasam@gmail.com',
    photo: 'https://info.aec.edu.in/AEC/StudentPhotos/22A91A61D2.jpg',
    userType: 'student',
    busType: 'collegeBus',
    city: 'Kakinada',
    stop: 'Municipal Office',
    busNumber: '446',
    busDriverName: 'Prakasham',
    activeStatus: true,
  };

  const handleLogout = () => {
    alert('Logged out');
  };

  return (
    <div>
      <UserProfileShowcase userData={userData} handleLogout={handleLogout} />
    </div>
  );
};

export default Apple1;
