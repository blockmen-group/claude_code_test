import React, { useEffect, useState } from 'react';
import { getUniqueZipcodes } from '../services/supabase';

const ZipcodeFilter = ({ onZipcodeChange }) => {
  const [zipcodes, setZipcodes] = useState([]);
  const [selectedZipcode, setSelectedZipcode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZipcodes = async () => {
      try {
        const uniqueZipcodes = await getUniqueZipcodes();
        setZipcodes(uniqueZipcodes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching zipcodes:', error);
        setLoading(false);
      }
    };

    fetchZipcodes();
  }, []);

  const handleChange = (e) => {
    const zipcode = e.target.value;
    setSelectedZipcode(zipcode);
    onZipcodeChange(zipcode);
  };

  if (loading) {
    return <div>Loading zipcodes...</div>;
  }

  return (
    <div className="zipcode-filter">
      <label htmlFor="zipcode-select">Filter by Zipcode: </label>
      <select
        id="zipcode-select"
        value={selectedZipcode}
        onChange={handleChange}
      >
        <option value="">All Zipcodes</option>
        {zipcodes.map((zipcode) => (
          <option key={zipcode} value={zipcode}>
            {zipcode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ZipcodeFilter;