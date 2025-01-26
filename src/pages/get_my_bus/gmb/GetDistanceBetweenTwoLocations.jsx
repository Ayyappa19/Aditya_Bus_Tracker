//GetDistanceBetweenTwoLocations.jsx

import React, { useEffect, useState } from 'react';

function GetDistanceBetweenTwoLocations({ startLocation, endLocation, mode }) {
  console.log(startLocation, endLocation)
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [busMarker, setBusMarker] = useState(null);4
  

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: startLocation.lat, lng: startLocation.lng },
      });

      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const directionsService = new window.google.maps.DirectionsService();

      directionsRenderer.setMap(map);
      directionsRenderer.setPanel(document.getElementById('sidebar'));

      // Initialize the bus marker at the starting location
      const busMarker = new window.google.maps.Marker({
        position: { lat: startLocation.lat, lng: startLocation.lng },
        map: map,
        icon: {
          url: './bus.png', // Custom bus logo
          scaledSize: new window.google.maps.Size(50, 50), // Resize the icon
        },
        title: 'Bus Marker',
      });

      setMap(map);
      setDirectionsRenderer(directionsRenderer);
      setDirectionsService(directionsService);
      setBusMarker(busMarker);
    }
  }, [startLocation, endLocation]);

  useEffect(() => {
    if (directionsService && directionsRenderer && startLocation && endLocation) {
      calculateAndDisplayRoute();
    }
  }, [directionsService, directionsRenderer, startLocation, endLocation]);

  const calculateAndDisplayRoute = () => {
    directionsService.route(
      {
        origin: { lat: startLocation.lat, lng: startLocation.lng },
        destination: { lat: endLocation.lat, lng: endLocation.lng },
        travelMode: window.google.maps.TravelMode[mode || 'DRIVING'],
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          animateBusMarker(response.routes[0].overview_path);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  };

  const animateBusMarker = (path) => {
    let step = 0; // Start from the first step
    const totalSteps = 500; // Number of steps for smooth movement
    const timePerStep = 20; // Time per step in milliseconds (lower value = smoother animation)
  
    const moveMarker = () => {
      if (step < totalSteps) {
        step += 1;
  
        // Calculate the next position along the path
        const nextPosition = path[Math.floor((step / totalSteps) * path.length)];
  
        // Set the new position of the bus marker
        if (nextPosition) {
          busMarker.setPosition(nextPosition);
        }
  
        // Schedule the next step
        window.setTimeout(moveMarker, timePerStep);
      }
    };
  
    moveMarker();
  };
  

  return (
    <div id="container">
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      <div id="sidebar" style={{ height: '400px', overflow: 'auto' }}></div>
    </div>
  );
}

export default GetDistanceBetweenTwoLocations;
