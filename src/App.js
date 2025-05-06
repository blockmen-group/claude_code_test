import React, { useState, useEffect } from 'react';
import { getVenues } from './services/supabase';
import ZipcodeFilter from './components/ZipcodeFilter';
import VenueMap from './components/VenueMap';
import VenueTable from './components/VenueTable';
import './styles/App.css';

function App() {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [zipcode, setZipcode] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('map');

  // Load venues on component mount with default zipcode 78704
  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);
        // Default to zipcode 78704
        const defaultZipcode = '78704';
        setZipcode(defaultZipcode);
        const venueData = await getVenues(defaultZipcode);
        setFilteredVenues(venueData);
      } catch (error) {
        console.error('Error loading venues:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  // Handle zipcode filter changes
  const handleZipcodeChange = async (zipcode) => {
    setZipcode(zipcode);
    setLoading(true);
    
    try {
      // If a zipcode is selected, filter venues by that zipcode
      const venueData = await getVenues(zipcode);
      setFilteredVenues(venueData);
    } catch (error) {
      console.error('Error filtering venues:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Venue Explorer</h1>
      </header>
      
      <div className="venue-controls">
        <ZipcodeFilter onZipcodeChange={handleZipcodeChange} defaultZipcode={zipcode} />
        <div className="venue-count">
          {loading ? 'Loading...' : `${filteredVenues.length} venues found in ${zipcode}`}
        </div>
      </div>
      
      <div className="tab-container">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            Map View
          </div>
          <div 
            className={`tab ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            Table View
          </div>
        </div>
        
        <div className={`tab-content ${activeTab === 'map' ? 'active' : ''}`}>
          <VenueMap venues={filteredVenues} />
        </div>
        
        <div className={`tab-content ${activeTab === 'table' ? 'active' : ''}`}>
          <VenueTable venues={filteredVenues} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;