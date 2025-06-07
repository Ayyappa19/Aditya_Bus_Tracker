import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import './lt_map.css';
import axios from 'axios';
import { label } from 'three/webgpu';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const initialCenter = {
    lat: 17.088,
    lng: 82.069
};

const mapOptions = {
    mapTypeId: 'satellite',
    label:true,
    tilt: 0
};

export default function BusTrackingMap() {
    const [busPosition, setBusPosition] = useState(initialCenter);
    const [destinationPosition, setDestinationPosition] = useState(null);
    const [path, setPath] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [map, setMap] = useState(null);
    const markerRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU"
    });

    const destinationIcon = isLoaded ? {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: '#FF0000',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
    } : null;

    const fetchBusData = async () => {
        try {
            const response = await axios.get("http://210.212.210.81:3000");
            console.log(response.data);

            const vehicleId = "1";
            const filteredData = response.data.filter(item => item.vehicle_id == vehicleId);

            if (filteredData.length > 0) {
                const lastEntry = filteredData[filteredData.length - 1];
                setBusPosition({
                    lat: parseFloat(lastEntry.latitude),
                    lng: parseFloat(lastEntry.longitude)
                });

                setPath(pathArray);
            } else {
                console.log("No data available for the vehicle.");
            }
        } catch (error) {
            console.error("Error fetching data", error);
            setError("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchBusData();

        // Set up interval to fetch data every second
        const intervalId = setInterval(fetchBusData, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (path.length > 0) {
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex < path.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                setBusPosition(path[currentIndex]);
                setDestinationPosition(path[currentIndex + 1] || path[0]);
            }, 200);

            return () => clearInterval(interval);
        }
    }, [path]);

    useEffect(() => {
        if (map && busPosition) {
            map.panTo(busPosition);
        }
    }, [busPosition, map]);

    const onLoad = React.useCallback(map => {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return isLoaded ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Live Bus Tracking</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <p className="text-gray-700 mb-2 text-center">
                        Current Bus Location:
                    </p>
                    <p className="text-gray-900 font-semibold text-center">
                        Latitude: {busPosition.lat.toFixed(6)}, Longitude: {busPosition.lng.toFixed(6)}
                    </p>
                </div>
                <div className="h-96 relative">
                    <div className="lt_map">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={busPosition}
                            options={mapOptions}
                            zoom={18}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {/* Bus Current Location Indicator */}
                            <Circle
                                center={busPosition}
                                radius={7} // Small radius to create a dot
                                options={{
                                    strokeOpacity: 1,
                                    strokeWeight: 2,
                                    fillColor: "red",
                                    fillOpacity: 1
                                }}
                            />

                            {destinationPosition && destinationIcon && (
                                <Marker position={destinationPosition} icon={destinationIcon} />
                            )}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}