import React, { useEffect, useState, useRef } from 'react';
import './gmb.css';
import temp from "../../../assets/get_my_bus/temp.webp";
import bus from "../../../assets/get_my_bus/bus.png";
import { FaSearchLocation } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import CustomLoader from '../../../assets/loader/BusLoader.json';

// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU';

function GetMyBus() {
    const [activeGround, setActiveGround] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [busList, setBusList] = useState([]);
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [source, setSource] = useState({ lat: 17.0879, lng: 82.0686 }); // Default source location
    const [destination, setDestination] = useState({ lat: 0, lng: 0 });
    const [directions, setDirections] = useState(null);
    const mapRef = useRef(null);
    const panelRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // Initial bus data fetch
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:9000/bus-data")
            .then(resp => {
                setBusList(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(fin=>{
                setLoading(false);
            })
    }, []);

    // Initialize Google Maps
    useEffect(() => {
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'weekly',
            libraries: ['places']
        });

        loader.load().then(() => {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 2
            });
            setMap(map);
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({ map, panel: panelRef.current });
            setDirectionsService(directionsService);
            setDirectionsRenderer(directionsRenderer);
        });
    }, []);

    const fetchBusData = (endpoint) => {
        setLoading(true);
        axios.get(`http://localhost:9000/${endpoint}`)
            .then(resp => {
                setBusList(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(fina=>{
                setLoading(false)
            })
    };

    const changeBusList = (value) => {
        setActiveGround(value);
        if (value === 1) {
            fetchBusData('kkd-bus-data');
        } else if (value === 2) {
            fetchBusData('rjy-bus-data');
        } else {
            fetchBusData('ptp-bus-data');
        }
    };

    const Search = () => {
        const updatedBusesList = busList.filter((item) => {
            return (item.bus_number === inputValue || item.driver_name.toLowerCase().includes(inputValue.trim().toLowerCase()));
        });
        setBusList(updatedBusesList);
    };

    // Function to handle directions
    const handleGetDirections = (item) => {
        if (!directionsService || !directionsRenderer) return;

        const dest = { lat: parseFloat(item.busLatitude), lng: parseFloat(item.busLongitude) };
        setDestination(dest);

        directionsService.route(
            {
                origin: source,
                destination: dest,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    setDirections(result);
                } else {
                    console.error(`Error fetching directions: ${result}`);
                }
            }
        );
    };

    return (
        <div className='gmb_main'>
            {/* Google Maps Section */}
            <div className="gmb_map">
                <h2 className="map-title">Aditya Bus Directions</h2>
                <div className="map-directions-container">
                    <div ref={mapRef} className="map-view" />
                    <div ref={panelRef} className="directions-panel">
                        {!directions && <h3>Directions will appear here</h3>}
                    </div>
                </div>
            </div>

            {/* Bus List and Search Section */}
            <div className="gmb_cards">
                <div className="gmb_search">
                    <div className="gmb_inpbut">
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            className='gmb_input'
                            type="text"
                            name="Search"
                            placeholder='Enter Bus Details...'
                        />
                        <div className="gmb_but" onClick={Search}>
                            <FaSearchLocation style={{ fontSize: '22px' }} />
                        </div>
                    </div>
                    <div className="gmb_refresh" onClick={() => window.location.reload()}>
                        <IoMdRefresh style={{ fontSize: '32px' }} />
                    </div>
                </div>

                {/* Ground Selection */}
                <div className="gmb_centerbar">
                    <div className="ground_details">
                        <div className={`ground ${activeGround === 1 ? 'active' : ''}`} onClick={() => changeBusList(1)}>
                            <FaCircle style={{ color: 'deepskyblue' }} /> KKD Ground
                        </div>
                        <div className={`ground ${activeGround === 2 ? 'active' : ''}`} onClick={() => changeBusList(2)}>
                            <FaCircle style={{ color: 'red' }} /> RJY Ground
                        </div>
                        <div className={`ground ${activeGround === 3 ? 'active' : ''}`} onClick={() => changeBusList(3)}>
                            <FaCircle style={{ color: 'darkblue' }} /> PTP Ground
                        </div>
                    </div>
                </div>

                {/* Bus Listing */}
                <div className="gmb_buslist">
                    {busList.length !== 0 ? (
                        busList.map((item, index) => (
                            <div className="gmb_buscard" key={index}>
                                <div className="driver_pic">
                                    <img src={temp} alt="" />
                                </div>
                                <div className="driver_details">
                                    <div className='bus_no'>Bus-no: {item.bus_number}</div>
                                    <div className='driver_name'>{item.driver_name}</div>
                                    <div className='ground_name'>
                                        <FaCircle style={{ color: item.bus_ground === 'KKD' ? 'deepskyblue' : (item.bus_ground === 'RJY' ? 'red' : 'darkblue') }} />
                                        {item.bus_ground} Ground
                                    </div>
                                </div>
                                <div className="bus_but">
                                    <div className="bus_status">
                                        <img src={bus} alt="" />
                                    </div>
                                    <div className="get_directions">
                                        <div className="get_directions_but" onClick={() => handleGetDirections(item)}>
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
