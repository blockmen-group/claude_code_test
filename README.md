# Venue Explorer

A web application for exploring and filtering venue data by zipcode.

## Features

- View venues on an interactive map
- Filter venues by zipcode
- View venue details in a table format
- Color-coded markers for different venue types

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account with venue data
- Mapbox API key

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/venue-explorer.git
   cd venue-explorer
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.development` file based on `.env.example` and add your API keys:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_KEY=your_supabase_key
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token
   ```

4. Start the development server:
   ```sh
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Database Structure

The application expects a Supabase database with a `clean_venues` table containing the following fields:

- `id`: Unique identifier for the venue
- `name`: Venue name
- `address`: Street address
- `city`: City
- `state`: State
- `zip_code`: Postal code
- `main_classification`: Venue type/category
- `latitude`: Geographic latitude
- `longitude`: Geographic longitude

## Technologies Used

- React
- Mapbox GL JS
- Supabase