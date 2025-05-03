import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox token from environment
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const VenueMap = ({ venues }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-97.7431, 30.2672], // Austin coordinates as default
      zoom: 11
    });
    
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Clean up on unmount
    return () => map.current.remove();
  }, []);
  
  // Update markers when venues change
  useEffect(() => {
    if (!map.current || !venues.length) return;
    
    // Remove existing markers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    while (existingMarkers[0]) {
      existingMarkers[0].remove();
    }
    
    // Add markers for each venue
    const bounds = new mapboxgl.LngLatBounds();
    
    venues.forEach(venue => {
      if (!venue.longitude || !venue.latitude) return;
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${venue.name}</h3>
         <p>${venue.address}</p>
         <p>${venue.city}, ${venue.state} ${venue.zip_code}</p>
         <p>Type: ${venue.main_classification || 'Unknown'}</p>`
      );
      
      // Create color-coded markers based on main_classification
      const markerColor = getMarkerColor(venue.main_classification);
      
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = markerColor;
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';
      el.style.border = '1px solid #333';
      
      new mapboxgl.Marker(el)
        .setLngLat([venue.longitude, venue.latitude])
        .setPopup(popup)
        .addTo(map.current);
      
      bounds.extend([venue.longitude, venue.latitude]);
    });
    
    // Adjust map to fit all markers if there are venues
    if (venues.length > 0) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [venues]);
  
  const getMarkerColor = (classification) => {
    // Simple color mapping for venue types
    const colorMap = {
      'Restaurant': '#e41a1c',
      'Bar': '#377eb8',
      'Restaurant And Bar': '#ff7f00',
      'Music Venue': '#4daf4a',
      'Nightclub': '#984ea3',
      'Coffee Shop': '#a65628',
      'Other': '#999999'
    };
    
    return colorMap[classification] || '#999999';
  };
  
  return (
    <div className="map-container">
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default VenueMap;