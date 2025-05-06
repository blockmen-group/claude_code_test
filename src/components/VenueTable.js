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
            <th>Rating</th>
            <th>Address</th>
            <th>City</th>
            <th>Zipcode</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.name || 'Unnamed Venue'}</td>
              <td>{venue.rating ? `${venue.rating.toFixed(1)} ⭐ (${venue.reviews || 0})` : 'N/A'}</td>
              <td>{venue.address || 'No address'}</td>
              <td>{venue.city || 'Austin'}</td>
              <td>{venue.zip_code}</td>
              <td>
                {venue.main_classification 
                  ? venue.main_classification.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
                  : 'Unknown'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueTable;