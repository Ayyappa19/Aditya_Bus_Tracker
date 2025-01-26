'use client'

import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import './lt_map.css'

const containerStyle = {
    width: '100%',
    height: '500px'
}

const initialCenter = {
    lat: 17.088, 
    lng: 82.069
}

const mapOptions = {
    mapTypeId: 'satellite',
    tilt: 0
}

export default function BusTrackingMap() {
    const [busPosition, setBusPosition] = useState(initialCenter)
    const [destinationPosition, setDestinationPosition] = useState(null)
    const [map, setMap] = useState(null)
    const markerRef = useRef(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCSkMcv8BF3Sxv8ugdVIBxxDs8exC8gDW0"
    })

    const destinationIcon = isLoaded ? {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: '#FF0000',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
    } : null

    useEffect(() => {
        if (isLoaded) {
            const path = [
                { lat: 17.087499905563725, lng: 82.06813014782053 },
                { lat: 17.08774998950085, lng: 82.06831509552883 },
                { lat: 17.088056126277426, lng: 82.06845944495969 },
                { lat: 17.08828465058568, lng: 82.06857221795254 },
                { lat: 17.088530421698824, lng: 82.06860379439053 },
                { lat: 17.088823621908162, lng: 82.06882934038583 },
                { lat: 17.089069392316205, lng: 82.06894211338525 },
                { lat: 17.089401397435108, lng: 82.06912255017664 },
                { lat: 17.089638543593637, lng: 82.06928043237625 },
                { lat: 17.089923118575054, lng: 82.06945635824509 },
                { lat: 17.089944677268065, lng: 82.06923081225938 },
                { lat: 17.08983257203719, lng: 82.0687977639668 },
                { lat: 17.089711843251603, lng: 82.06850906510509 },
                { lat: 17.089539373422237, lng: 82.0684459122291 },
            ]
            let currentIndex = 0

            const interval = setInterval(() => {
                if (currentIndex < path.length - 1) {
                    currentIndex++
                    setBusPosition(path[currentIndex])
                    setDestinationPosition(path[currentIndex + 1] || path[0])
                } else {
                    currentIndex = 0
                    setBusPosition(path[currentIndex])
                    setDestinationPosition(path[currentIndex + 1])
                }
            }, 2000)

            return () => clearInterval(interval)
        }
    }, [isLoaded])

    useEffect(() => {
        if (map && markerRef.current) {
            map.panTo(busPosition)
        }
    }, [busPosition, map])

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Live Bus Tracking</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <p className="text-gray-700 mb-2" style={{ alignContent: 'center', textAlign: 'center' }}>
                        Current Bus Location:
                    </p>
                    <p className="text-gray-900 font-semibold" style={{ alignContent: 'center', textAlign: 'center' }}>
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
                            {destinationPosition && destinationIcon && (
                                <Marker
                                    position={destinationPosition}
                                    icon={destinationIcon}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    ) : <div className="text-center p-4">Loading...</div>
}
