import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://eczsrxszitvrlgkkzywk.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseKey) {
  console.error('Supabase key is missing! Make sure to set REACT_APP_SUPABASE_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch venues from the clean_venues table filtered by zipcode
 * @param {string} zipCode - Optional zipcode to filter venues
 * @returns {Promise<Array>} - Array of venue objects
 */
export const getVenues = async (zipCode = null) => {
  let query = supabase
    .from('clean_venues')
    .select('id, name, address, city, state, zip_code, main_classification, latitude, longitude')
    .order('name');
    
  // Add zipcode filter if provided
  if (zipCode) {
    query = query.eq('zip_code', zipCode);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching venues:', error);
    return [];
  }
  
  return data;
};

/**
 * Get unique zipcodes from venues table
 * @returns {Promise<Array>} - Array of unique zipcodes
 */
export const getUniqueZipcodes = async () => {
  const { data, error } = await supabase
    .from('clean_venues')
    .select('zip_code')
    .order('zip_code');
    
  if (error) {
    console.error('Error fetching zipcodes:', error);
    return [];
  }
  
  // Extract unique zipcodes
  const uniqueZipcodes = [...new Set(data.map(item => item.zip_code))];
  return uniqueZipcodes;
};