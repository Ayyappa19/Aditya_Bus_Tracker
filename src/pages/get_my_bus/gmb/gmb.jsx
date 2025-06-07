import React, { useEffect, useState, useRef } from 'react';
import './gmb.css';
import temp from "../../../assets/get_my_bus/temp.webp";
import bus from "../../../assets/get_my_bus/bus.png";
import { FaSearchLocation } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = "AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU" ;

function GetMyBus() {
    const [activeGround, setActiveGround] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [busList, setBusList] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [distance, setDistance] = useState(null);

    const mapRef = useRef(null);
    const panelRef = useRef(null);

    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLoc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(userLoc);
                    initializeMap(userLoc); // Initialize map with user's location
                },
                (error) => {
                    console.error("Error getting user location: ", error);
                    
                    const defaultLocation = { lat: 17.387140, lng: 78.491684 };
                    setUserLocation(defaultLocation);
                    initializeMap(defaultLocation);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            const defaultLocation = { lat: 17.387140, lng: 82.491684 };
            setUserLocation(defaultLocation);
            initializeMap(defaultLocation);
        }
    }, []);

    // Initialize Google Maps
    const initializeMap = (userLocation) => {
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'weekly',
            libraries: ['places']
        });

        loader.load().then(() => {
            const map = new google.maps.Map(mapRef.current, {
                center: userLocation,
                zoom: 12
            });
            setMap(map);

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map,
                panel: panelRef.current
            });

            setDirectionsService(directionsService);
            setDirectionsRenderer(directionsRenderer);
        });
    };

    // Fetch bus data
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:9000/bus-data")
            .then(resp => {
                setBusList(resp.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleGetDirections = (bus) => {
        if (!directionsService || !directionsRenderer || !userLocation) return;

        const busLocation = {
            lat: parseFloat(bus.busLatitude),
            lng: parseFloat(bus.busLongitude)
        };

        const request = {
            origin: userLocation,
            destination: busLocation,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                setDistance(result.routes[0].legs[0].distance.text); // Get distance from response
            } else {
                console.error(`Error fetching directions: ${result}`);
            }
        });
    };

    const changeBusList = (value) => {
        setActiveGround(value);
        const endpoint = value === 1 ? 'kkd-bus-data' : value === 2 ? 'rjy-bus-data' : 'ptp-bus-data';
        setLoading(true);
        axios.get(`http://localhost:9000/${endpoint}`)
            .then(resp => {
                setBusList(resp.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const Search = () => {
        const filteredBuses = busList.filter((item) => {
            return (
                item.bus_number === inputValue ||
                item.driver_name.toLowerCase().includes(inputValue.trim().toLowerCase())
            );
        });
        setBusList(filteredBuses);
    };

    return (
        <div className="gmb_main">
            <div className="gmb_map">
                <h2 className="map-title">Aditya Bus Directions</h2>

                {/* Google Map View */}
                <div className="map-directions-container">
                    <div ref={mapRef} className="map-view" style={{ height: '85vh', width: '100%' }} />
                    <div ref={panelRef} className="directions-panel">
                        {distance ? (
                            <h3>Distance: {distance}</h3>
                        ) : (
                            <h3>Directions will appear here</h3>
                        )}
                    </div>
                </div>
            </div>

            <div className="gmb_cards">
                <div className="gmb_search">
                    <div className="gmb_inpbut">
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            className="gmb_input"
                            type="text"
                            placeholder="Enter Bus Details..."
                        />
                        <div className="gmb_but" onClick={Search}>
                            <FaSearchLocation style={{ fontSize: '22px' }} />
                        </div>
                    </div>
                    <div className="gmb_refresh" onClick={() => window.location.reload()}>
                        <IoMdRefresh style={{ fontSize: '32px' }} />
                    </div>
                </div>

                <div className="gmb_centerbar">
                    <div className="ground_details">
                        <div
                            className={`ground ${activeGround === 1 ? 'active' : ''}`}
                            onClick={() => changeBusList(1)}
                        >
                            <FaCircle style={{ color: 'deepskyblue' }} /> KKD Ground
                        </div>
                        <div
                            className={`ground ${activeGround === 2 ? 'active' : ''}`}
                            onClick={() => changeBusList(2)}
                        >
                            <FaCircle style={{ color: 'red' }} /> RJY Ground
                        </div>
                        <div
                            className={`ground ${activeGround === 3 ? 'active' : ''}`}
                            onClick={() => changeBusList(3)}
                        >
                            <FaCircle style={{ color: 'darkblue' }} /> PTP Ground
                        </div>
                    </div>
                </div>

                <div className="gmb_buslist">
                    {busList.length !== 0 ? (
                        busList.map((item, index) => (
                            <div className="gmb_buscard" key={index}>
                                <div className="driver_pic">
                                    <img src={temp} alt="Driver" />
                                </div>
                                <div className="driver_details">
                                    <div className="bus_no">Bus-no: {item.bus_number}</div>
                                    <div className="driver_name">{item.driver_name}</div>
                                    <div className="ground_name">
                                        <FaCircle
                                            style={{
                                                color:
                                                    item.bus_ground === 'KKD'
                                                        ? 'deepskyblue'
                                                        : item.bus_ground === 'RJY'
                                                        ? 'red'
                                                        : 'darkblue'
                                            }}
                                        />
                                        {item.bus_ground} Ground
                                    </div>
                                </div>
                                <div className="bus_but">
                                    <div className="bus_status">
                                        <img src={bus} alt="Bus" />
                                    </div>
                                    <div className="get_directions">
                                        <div
                                            className="get_directions_but"
                                            onClick={() => handleGetDirections(item)}
                                        >
                                            Get Directions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No Buses are Available!</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetMyBus;
