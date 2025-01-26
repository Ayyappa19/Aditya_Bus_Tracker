'use client'

import React, { useState, useRef, useEffect, use } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import './v0map.css'
import axios from 'axios'

// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function V0Map() {
    const [map, setMap] = useState(null)
    const [directionsService, setDirectionsService] = useState(null)
    const [directionsRenderer, setDirectionsRenderer] = useState(null)
    const [source, setSource] = useState({ lat: 17.0879, lng: 82.0686 })
    const [destination, setDestination] = useState({ lat: 0, lng: 0 })
    const [directions, setDirections] = useState(null)
    const mapRef = useRef(null)
    const panelRef = useRef(null)
    const ls = useState(JSON.parse(localStorage.getItem("item")))

    useEffect(() => {
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'weekly',
            libraries: ['places']
        })

        loader.load().then(() => {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 2
            })
            setMap(map)
            const directionsService = new google.maps.DirectionsService()
            const directionsRenderer = new google.maps.DirectionsRenderer({ map, panel: panelRef.current })
            setDirectionsService(directionsService)
            setDirectionsRenderer(directionsRenderer)
        })
    }, [])

    const handleGetDirections = () => {
        if (!directionsService || !directionsRenderer) return

        axios.get("http://localhost:9000/get-bus-info")
        .then(succ=>{
            let dest = {lat : parseFloat(succ.data[0].busLatitude), lng : parseFloat(succ.data[0].busLongitude)}
            console.log(dest)
            setDestination(dest)
        })
        .catch(err=>{
            console.log(err)
        })

        directionsService.route(
            {
                origin: source,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result)
                    setDirections(result)
                } else {
                    console.error(`Error fetching directions ${result}`)
                }
            }
        )
    }

    return (
        <div className="map-container">
            <h2 className="map-title">Aditya Bus Directions</h2>
            <button
                onClick={handleGetDirections}
                className="submit-button"
            >
                Get Directions
            </button>
            <div className="map-directions-container">
                <div ref={mapRef} className="map-view" />
                <div ref={panelRef} className="directions-panel">
                    {!directions && <h3>Directions will appear here</h3>}
                </div>
            </div>
        </div>
    )
}