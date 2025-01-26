import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './gmaps.css';  // Importing the CSS file

function Gmaps() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [directions, setDirections] = useState(null);

    const fetchDirections = () => {
        if (source !== '' && destination !== '') {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route(
                {
                    origin: source,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === 'OK') {
                        setDirections(result);
                    } else {
                        alert('Could not fetch directions. Please check the locations.');
                    }
                }
            );
        } else {
            alert('Please enter both source and destination.');
        }
    };

    const openGoogleMaps = () => {
        if (source && destination) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&travelmode=driving&dir_action=navigate`;
            window.open(url, '_blank');
        } else {
            alert('Please enter both source and destination.');
        }
    };

    return (
        <div className="container">
            <h2>Directions Finder</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Enter Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="input"
                />
            </div>
            <button onClick={fetchDirections} className="button button-get">
                Get Directions
            </button>
            <button onClick={openGoogleMaps} className="button button-navigate">
                Start Navigation in Google Maps
            </button>

            <LoadScript googleMapsApiKey="AIzaSyCSkMcv8BF3Sxv8ugdVIBxxDs8exC8gDW0">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '500px', marginTop: '20px', borderRadius: '10px', overflow: 'hidden' }}
                    zoom={8}
                    center={{ lat: 37.7749, lng: -122.4194 }}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default Gmaps;
