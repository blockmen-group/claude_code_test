import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://eczsrxszitvrlgkkzywk.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseKey) {
  console.error('Supabase key is missing! Make sure to set REACT_APP_SUPABASE_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch venues from the warehouse.clean_venues table filtered by zipcode
 * @param {string} zipCode - Zipcode to filter venues
 * @returns {Promise<Array>} - Array of venue objects
 */
export const getVenues = async (zipCode = null) => {
  console.log('Fetching venues for zipcode:', zipCode);
  
  try {
    // Use the warehouse schema and correct column names based on our findings
    let query = supabase
      .schema('warehouse')
      .from('clean_venues')
      .select(`
        id, 
        display_name, 
        display_address, 
        display_city, 
        license_zipcode, 
        main_classification, 
        latitude, 
        longitude,
        rating,
        reviews
      `)
      .order('display_name');
      
    // Add zipcode filter if provided
    if (zipCode) {
      query = query.eq('license_zipcode', zipCode);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching venues:', error);
      return [];
    }
    
    // Map the data to match the expected structure in our app
    const mappedData = (data || []).map(venue => ({
      id: venue.id,
      name: venue.display_name,
      address: venue.display_address,
      city: venue.display_city,
      state: 'TX', // Defaulting to TX since we're looking at Austin data
      zip_code: venue.license_zipcode,
      main_classification: venue.main_classification,
      latitude: venue.latitude,
      longitude: venue.longitude,
      rating: venue.rating,
      reviews: venue.reviews
    }));
    
    console.log(`Found ${mappedData.length} venues for zipcode ${zipCode}`);
    return mappedData;
  } catch (error) {
    console.error('Exception in getVenues:', error);
    return [];
  }
};