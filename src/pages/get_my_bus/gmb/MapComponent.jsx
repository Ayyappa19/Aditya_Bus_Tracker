// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const MapComponent = ({ onSetStartLocation }) => {
//   const navigate = useNavigate();
//   const [startLocation, setStartLocation] = useState(null);
//   const mykey = import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
//   useEffect(() => {
//     let map;
//     let infoWindow;

//     const initMap = () => {
//       map = new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: 17.0894, lng: 82.0668 }, // Default center
//         zoom: 5,
//       });

//       infoWindow = new window.google.maps.InfoWindow();

//       // Automatically get the user's current location
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             };
//             setStartLocation(pos); // Update state
//             onSetStartLocation(pos); // Pass to parent
//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Your location');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           },
//           () => {
//             handleLocationError(true, infoWindow, map.getCenter());
//           }
//         );
//       } else {
//         handleLocationError(false, infoWindow, map.getCenter());
//       }
//     };

//     const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
//       infoWindow.setPosition(pos || { lat: 0, lng: 0 });
//       infoWindow.setContent(
//         browserHasGeolocation
//           ? 'Error: The Geolocation service failed.'
//           : "Error: Your browser doesn't support geolocation."
//       );
//       infoWindow.open(map);
//     };

//     const loadScript = (url, callback) => {
//       const existingScript = document.querySelector(script[src="${url}"]);
//       if (!existingScript) {
//         const script = document.createElement('script');
//         script.src = url;
//         script.async = true;
//         script.defer = true;
//         document.head.appendChild(script);
//         script.onload = callback;
//       } else {
//         callback();
//       }
//     };

//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key=${mykey}`,
//       initMap
//     );

//     return () => {
//       const script = document.querySelector('script[src*="maps.googleapis.com"]');
//       if (script) {
//         script.remove();
//       }
//     };
//   }, [onSetStartLocation]);

//   const handleRouteClick = () => {
//     if (startLocation) {
//       navigate('/bus'); // 
//     } else {
//       alert('Please set your start location first!');
//     }
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
//       <div id="map" style={{ height: '100%', width: '100%' }}></div>
//       {/* <button
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           padding: '10px 20px',
//           background: '#007BFF',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//         onClick={handleRouteClick}
//       >
//         Go to Bus
//       </button> */}
//     </div>
//   );
// };

// export default MapComponent;


import React, { useEffect, useState } from 'react';

const MapComponent = ({ onSetStartLocation }) => {
    const [startLocation, setStartLocation] = useState(null);
    const mykey = import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        let map;
        let infoWindow;

        const initMap = () => {
            map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 17.0894, lng: 82.0668 },
                zoom: 5,
            });

            infoWindow = new window.google.maps.InfoWindow();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        setStartLocation(pos);
                        onSetStartLocation(pos); // Pass to parent
                        infoWindow.setPosition(pos);
                        infoWindow.setContent('Your location');
                        infoWindow.open(map);
                        map.setCenter(pos);
                    },
                    () => handleLocationError(true, infoWindow, map.getCenter())
                );
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        };

        const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
            infoWindow.setPosition(pos || { lat: 0, lng: 0 });
            infoWindow.setContent(
                browserHasGeolocation
                    ? 'Error: The Geolocation service failed.'
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        };

        const loadScript = (url, callback) => {
            const existingScript = document.querySelector(`script[src="${url}"]`);
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
                script.onload = callback;
            } else {
                callback();
            }
        };

        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${mykey}&callback=initMap`,
            () => window.initMap = initMap
        );
    }, [onSetStartLocation]);

    return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
