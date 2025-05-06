import React, { useState } from 'react';

const ZipcodeFilter = ({ onZipcodeChange, defaultZipcode = '78704' }) => {
  const [zipcode, setZipcode] = useState(defaultZipcode);

  const handleChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onZipcodeChange(zipcode);
  };

  return (
    <div className="zipcode-filter">
      <form onSubmit={handleSubmit}>
        <label htmlFor="zipcode-input">Filter by Zipcode: </label>
        <input
          id="zipcode-input"
          type="text"
          value={zipcode}
          onChange={handleChange}
          placeholder="Enter zipcode"
          maxLength="5"
          pattern="[0-9]{5}"
          title="Five digit zipcode"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default ZipcodeFilter;