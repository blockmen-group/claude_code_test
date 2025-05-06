const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase connection details
const supabaseUrl = 'https://eczsrxszitvrlgkkzywk.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Try to get a list of all tables in the warehouse schema
    const { data: tables, error: tablesError } = await supabase.rpc('get_tables');
    
    if (tablesError) {
      console.error('Error fetching tables:', tablesError);
    } else {
      console.log('Available tables:', tables);
    }
    
    // Try to fetch venue data from warehouse schema without filter first to see columns
    console.log('Fetching sample data to check columns...');
    const { data: sampleData, error: sampleError } = await supabase
      .schema('warehouse')
      .from('clean_venues')
      .select('*')
      .limit(1);
      
    if (sampleError) {
      console.error('Error fetching sample data:', sampleError);
    } else if (sampleData && sampleData.length > 0) {
      console.log('Available columns:', Object.keys(sampleData[0]));
      
      // Check if zipcode column exists and what it's called
      const columns = Object.keys(sampleData[0]);
      const zipcodeColumn = columns.find(col => 
        col.toLowerCase().includes('zip') || 
        col.toLowerCase().includes('postal')
      );
      
      if (zipcodeColumn) {
        console.log(`Found zipcode column: ${zipcodeColumn}`);
        
        // Now try with the correct column name
        const { data: venues, error: venuesError } = await supabase
          .schema('warehouse')
          .from('clean_venues')
          .select('*')
          .eq(zipcodeColumn, '78704')
          .limit(5);
          
        if (venuesError) {
          console.error(`Error fetching with ${zipcodeColumn}:`, venuesError);
        } else {
          console.log(`Found ${venues.length} venues in zipcode 78704:`, venues);
        }
      }
    }
    
    // Original attempts for reference
    const { data: venues, error: venuesError } = await supabase
      .from('clean_venues')
      .select('*')
      .limit(5);
      
    // Try with explicit schema
    if (venuesError && venuesError.message.includes('does not exist')) {
      console.log('Trying with explicit schema without filter...');
      const { data: warehouseVenues, error: warehouseError } = await supabase
        .schema('warehouse')
        .from('clean_venues')
        .select('*')
        .limit(5);
        
      if (warehouseError) {
        console.error('Error fetching from warehouse.clean_venues:', warehouseError);
      } else {
        console.log(`Found ${warehouseVenues.length} venues in warehouse.clean_venues:`, warehouseVenues);
      }
    }
    
    if (venuesError) {
      console.error('Error fetching clean_venues:', venuesError);
    } else {
      console.log(`Found ${venues.length} venues in zip code 78704:`, venues);
    }
    
  } catch (error) {
    console.error('Exception during connection test:', error);
  }
}

testConnection();