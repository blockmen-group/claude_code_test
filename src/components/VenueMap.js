import React, { useRef, useEffect } from 'react';

const VenueMap = ({ venues }) => {
  const mapContainer = useRef(null);
  
  useEffect(() => {
    // Create a script element for Mapbox GL JS
    const mapboxScript = document.createElement('script');
    mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/v3.11.1/mapbox-gl.js';
    mapboxScript.async = true;
    
    // Create a stylesheet for Mapbox GL CSS
    const mapboxCss = document.createElement('link');
    mapboxCss.href = 'https://api.mapbox.com/mapbox-gl-js/v3.11.1/mapbox-gl.css';
    mapboxCss.rel = 'stylesheet';
    
    // Add these to the document head
    document.head.appendChild(mapboxCss);
    
    // Function to initialize the map once the script has loaded
    const initializeMap = () => {
      if (!window.mapboxgl) {
        console.error('mapboxgl not loaded');
        return;
      }
      
      // Use token from environment variables or use a placeholder (for demo only)
      window.mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';
      
      // Create the map
      const map = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-97.7431, 30.2672], // Austin coordinates
        zoom: 11
      });
      
      // Display venues on the map if available
      if (venues && venues.length > 0) {
        map.on('load', () => {
          // Create markers for each venue
          venues.forEach(venue => {
            if (venue.longitude && venue.latitude) {
              // Simple marker without custom styling
              new window.mapboxgl.Marker()
                .setLngLat([venue.longitude, venue.latitude])
                .setPopup(new window.mapboxgl.Popup().setHTML(`
                  <div style="max-width: 200px;">
                    <h3 style="margin-bottom: 5px;">${venue.name || 'Unnamed Venue'}</h3>
                    ${venue.rating ? `<p style="margin: 0 0 5px;"><strong>Rating:</strong> ${venue.rating.toFixed(1)} ⭐ (${venue.reviews || 0} reviews)</p>` : ''}
                    <p style="margin: 0 0 5px;">${venue.address || 'No address'}</p>
                    <p style="margin: 0 0 5px;">${venue.city || 'Austin'}, ${venue.state || 'TX'} ${venue.zip_code}</p>
                    <p style="margin: 0;"><strong>Type:</strong> ${venue.main_classification ? venue.main_classification.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Unknown'}</p>
                  </div>
                `))
                .addTo(map);
            }
          });
        });
      }
      
      // Cleanup function
      return () => {
        map.remove();
      };
    };
    
    // Execute the initialization function when the script loads
    mapboxScript.onload = initializeMap;
    
    // Add the script to the document
    document.head.appendChild(mapboxScript);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(mapboxScript);
      if (mapboxCss.parentNode) {
        document.head.removeChild(mapboxCss);
      }
    };
  }, [venues]);
  
  return (
    <div className="map-container">
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default VenueMap;