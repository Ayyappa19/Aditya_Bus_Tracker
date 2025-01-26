import React, { useState } from "react";
import "./home.css";
import SideNav from "./sidenav";
import { Header } from "./home_header";
import WaveAnimation from "./Wave-animation";
import { MdDirectionsBus } from 'react-icons/md';
import { BsBusFront } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { PiGpsFixBold } from 'react-icons/pi';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { GrResources } from 'react-icons/gr';
import { GiSun } from "react-icons/gi";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const cards = [
        {
            heading: "Get Directions",
            icon: <MdDirectionsBus />,
            route: '/get-my-bus',
        },
        {
            heading: "Live Tracking",
            icon: <PiGpsFixBold />,
            route: '/live-tracking',
        },
        {
            heading: "Profile",
            icon: <CgProfile />,
            route: '/user-profile',
        },

        {
            heading: "Bus Coordinator",
            icon: <GiPoliceOfficerHead />,
            route: '/bus-coordinators',
        },
        {
            heading: "Source Buses",
            icon: <GrResources />,
            route: '*',
        },
    ];

    const totalCards = cards.length;

    const updateCarousel = (index) => {
        setCurrentCardIndex((prevIndex) => (prevIndex + index + totalCards) % totalCards);
    };
    return (
        <>
            <div className="home-major">
                <div className="home_parent">
                    {/* <div>
                        <video height={695} autoPlay loop muted className="home_bg" style={{ zIndex: -1 }}>
                            <source src={homeBusBg} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div> */}
                    <div >
                        <Header />
                    </div>
                    {/* <div className="home_button">
                        <a href="#hello">Get Started</a>
                    </div> */}
                    <div className='home_bus_png'>
                        <GiSun className='home_icon'
                            style={{
                                width: 'fit-content',
                                height: 'fit-content',
                                position: 'absolute',
                                // fontSize: '280px'
                            }
                            }
                        />
                    </div>
                </div>
                <div className="home_parent2" id="hello">
                    <div className="home_bg2">
                        <WaveAnimation />
                    </div>
                    <div className="home_cards">
                        <div className="home_waviy" id="hello">
                            <span style={{ '--i': 1 }}>C</span>
                            <span style={{ '--i': 2 }}>H</span>
                            <span style={{ '--i': 3 }}>O</span>
                            <span style={{ '--i': 4 }}>O</span>
                            <span style={{ '--i': 5 }}>S</span>
                            <span style={{ '--i': 6 }}>E</span>
                            <span style={{ '--i': 7 }}>- </span>
                            <span style={{ '--i': 8 }}>Y</span>
                            <span style={{ '--i': 9 }}>O</span>
                            <span style={{ '--i': 10 }}>U</span>
                            <span style={{ '--i': 11 }}>R</span>
                            <span style={{ '--i': 12 }}>-</span>
                            <span style={{ '--i': 13 }}>Q</span>
                            <span style={{ '--i': 14 }}>U</span>
                            <span style={{ '--i': 15 }}>E</span>
                            <span style={{ '--i': 16 }}>R</span>
                            <span style={{ '--i': 17 }}>Y</span>
                        </div>
                        <div className="home_we-carousel">
                            <div className="we-arrow left" onClick={() => updateCarousel(-1)}>
                                &#10094;
                            </div>
                            <div className="home_we-card-container">
                                {cards.map((card, index) => {
                                    const isActive = index === currentCardIndex;
                                    const isPrev1 = index === (currentCardIndex - 1 + totalCards) % totalCards;
                                    const isNext1 = index === (currentCardIndex + 1) % totalCards;
                                    const isPrev2 = index === (currentCardIndex - 2 + totalCards) % totalCards;
                                    const isNext2 = index === (currentCardIndex + 2) % totalCards;
                                    const isPrev3 = index === (currentCardIndex - 3 + totalCards) % totalCards;
                                    const isNext3 = index === (currentCardIndex + 3) % totalCards;

                                    return (

                                        <div
                                            key={index}
                                            className={`home_we-card ${isActive ? 'active' : ''} ${isPrev1 ? 'prev-1' : ''} ${isNext1 ? 'next-1' : ''} ${isPrev2 ? 'prev-2' : ''} ${isNext2 ? 'next-2' : ''} ${isPrev3 ? 'prev-3' : ''} ${isNext3 ? 'next-3' : ''}`}

                                        >
                                            <h3>{card.heading}</h3>
                                            <p>{card.paragraph}</p>
                                            <div style={{ fontSize: '80px', color: '#333' }}>{card.icon}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="we-arrow right" onClick={() => updateCarousel(1)}>
                                &#10095;
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};