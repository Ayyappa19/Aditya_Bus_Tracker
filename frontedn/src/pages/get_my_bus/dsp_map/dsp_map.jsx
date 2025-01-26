import React, { useState, useEffect } from "react";
import './dsmap.css'

const MapComponent = () => {
    const [startLat, setStartLat] = useState("");
    const [startLng, setStartLng] = useState("");
    const [endLat, setEndLat] = useState("");
    const [endLng, setEndLng] = useState("");
    const [mode, setMode] = useState("DRIVING");
    const [map, setMap] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);

    useEffect(() => {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API not loaded");
            return;
        }

        const mapObj = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }, // Chicago as default center
            disableDefaultUI: true,
        });

        const directionsRendererObj = new window.google.maps.DirectionsRenderer();
        const directionsServiceObj = new window.google.maps.DirectionsService();

        directionsRendererObj.setMap(mapObj);
        directionsRendererObj.setPanel(document.getElementById("sidebar"));

        setMap(mapObj);
        setDirectionsRenderer(directionsRendererObj);
        setDirectionsService(directionsServiceObj);

    }, []); // Runs only once when component mounts

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !map) return;

        const calculateAndDisplayRoute = () => {
            const start = {
                lat: parseFloat(startLat),
                lng: parseFloat(startLng),
            };
            const end = {
                lat: parseFloat(endLat),
                lng: parseFloat(endLng),
            };

            if (isNaN(start.lat) || isNaN(start.lng) || isNaN(end.lat) || isNaN(end.lng)) {
                alert("Please enter valid latitude and longitude values.");
                return;
            }

            directionsService
                .route({
                    origin: start,
                    destination: end,
                    travelMode: window.google.maps.TravelMode[mode],
                })
                .then((response) => {
                    directionsRenderer.setDirections(response);
                })
                .catch((e) => {
                    window.alert("Directions request failed due to " + e.message);
                });
        };

        if (startLat && startLng && endLat && endLng) {
            calculateAndDisplayRoute();
        }
    }, [startLat, startLng, endLat, endLng, mode, directionsService, directionsRenderer, map]);

    return (
        <div>
            <div id="floating-panel">
                <strong>Start Latitude:</strong>
                <input
                    id="start-lat"
                    type="number"
                    step="any"
                    placeholder="Enter latitude"
                    value={startLat}
                    onChange={(e) => setStartLat(e.target.value)}
                />
                <br />
                <strong>Start Longitude:</strong>
                <input
                    id="start-lng"
                    type="number"
                    step="any"
                    placeholder="Enter longitude"
                    value={startLng}
                    onChange={(e) => setStartLng(e.target.value)}
                />
                <br />
                <strong>End Latitude:</strong>
                <input
                    id="end-lat"
                    type="number"
                    step="any"
                    placeholder="Enter latitude"
                    value={endLat}
                    onChange={(e) => setEndLat(e.target.value)}
                />
                <br />
                <strong>End Longitude:</strong>
                <input
                    id="end-lng"
                    type="number"
                    step="any"
                    placeholder="Enter longitude"
                    value={endLng}
                    onChange={(e) => setEndLng(e.target.value)}
                />
                <br />
                <b>Mode of Travel: </b>
                <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="DRIVING">Driving</option>
                    <option value="WALKING">Walking</option>
                    <option value="BICYCLING">Bicycling</option>
                    <option value="TRANSIT">Transit</option>
                </select>
            </div>
            <div id="container" style={{ display: "flex", height: "100vh" }}>
                <div id="map" style={{ flexGrow: 4, height: "100%" }}></div>
                <div id="sidebar" style={{ flexGrow: 1, padding: "1rem", overflow: "auto", maxWidth: "30rem" }}></div>
            </div>
        </div>
    );
};

export default MapComponent;