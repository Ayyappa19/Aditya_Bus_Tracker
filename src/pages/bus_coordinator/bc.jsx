import React from 'react';
import './bc.css';
import temp from "../../assets/get_my_bus/temp.webp"

const coordinators = [
    {
        id: 1,
        name: "N R Yadav",
        photo: temp,
        phone: "9398542959",
        email: "cserajeswaryadav@gmail.com",
        designation: "Senior Coordinator"
    },
    {
        id: 2,
        name: "Ayyappa Swamy",
        photo: temp,
        phone: "69023843948",
        email: "cserajeswaryadav@gmail.com",
        designation: "Route Planner"
    },
    {
        id: 3,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "dspbro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 4,
        name: "Hanumanthu Buddha",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 5,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 6,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 7,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 8,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 9,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
    {
        id: 10,
        name: "Durga Sai Prasad Ganapathi",
        photo: temp,
        phone: "768751684654",
        email: "hanubro@gmail.com",
        designation: "Safety Officer"
    },
];

const CoordinatorCard = ({ coordinator }) => (
    <div className="card">
        <div className="card-header">
            <img className="card-avatar" src={coordinator.photo} alt={coordinator.name} />
            <div className="card-info">
                <h3 className="card-title">{coordinator.name}</h3>
                <p className="card-designation">{coordinator.designation}</p>
            </div>
        </div>
        <div className="card-body">
            <p><strong>Phone:</strong> {coordinator.phone}</p>
            <p><strong>Email:</strong> {coordinator.email}</p>
            <p><strong>Designation:</strong> {coordinator.designation}</p>
        </div>
    </div>
);

export default function BusCoordinatorCards() {
    return (
        <div className="page-container">
            <h1 className="page-title">Bus Coordinators</h1>
            <div className="card-grid">
                {coordinators.map((coordinator) => (
                    <CoordinatorCard key={coordinator.id} coordinator={coordinator} />
                ))}
            </div>
        </div>
    );
}
