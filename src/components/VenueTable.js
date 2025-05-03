import React from 'react';

const VenueTable = ({ venues, loading }) => {
  if (loading) {
    return <div>Loading venues...</div>;
  }

  if (!venues.length) {
    return <div>No venues found with the selected criteria.</div>;
  }

  return (
    <div className="venue-table-container">
      <table className="venue-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zipcode</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.name}</td>
              <td>{venue.address}</td>
              <td>{venue.city}</td>
              <td>{venue.state}</td>
              <td>{venue.zip_code}</td>
              <td>{venue.main_classification || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueTable;