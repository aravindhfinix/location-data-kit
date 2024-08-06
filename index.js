const isNode = typeof window === 'undefined';

// Load JSON data depending on the environment
const loadData = async (url) => {
  if (isNode) {
    // Node.js environment
    // const fs = require('fs');
    // const path = require('path');
    // const filePath = path.join(__dirname, 'data', url);
    // return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return console.log('node running')
  } else {
    // Browser environment
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }
};

// Define file paths based on the environment
const getPath = (fileName) => isNode
  ? fileName // Use the relative path in Node.js
  : `/data/${fileName}`; // Use the URL path in the browser

let countries = [];
let states = [];
let cities = [];

// Load data and store it
const initializeData = async () => {
  try {
    const [countriesData, statesData, citiesData] = await Promise.all([
      loadData(getPath('countries.json')),
      loadData(getPath('states.json')),
      loadData(getPath('cities.json'))
    ]);
    countries = countriesData;
    states = statesData;
    cities = citiesData;
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Helper function to create case-insensitive regex
const createRegex = (str) => new RegExp(str, 'i');

// Fetch all countries with optional search
const fetchAllCountries = async (search = null) => {
  await initializeData();
  let result = countries;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(country => regex.test(country.name));
  }
  return result;
};

// Fetch all states with optional search
const fetchAllStates = async (search = null) => {
  await initializeData();
  let result = states;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(state => regex.test(state.name));
  }
  return result;
};

// Fetch all cities with optional search
const fetchAllCities = async (search = null) => {
  await initializeData();
  let result = cities;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(city => regex.test(city.name));
  }
  return result;
};

// Fetch states by country code with optional search
const fetchStatesByCountry = async (countryCode, search = null) => {
  await initializeData();
  let result = states.filter(state => state.countryCode === countryCode);
  if (search) {
    const regex = createRegex(search);
    result = result.filter(state => regex.test(state.name));
  }
  return result;
};

// Fetch cities by state code with optional search
const fetchCitiesByState = async (stateCode, search = null) => {
  await initializeData();
  let result = cities.filter(city => city.stateCode === stateCode);
  if (search) {
    const regex = createRegex(search);
    result = result.filter(city => regex.test(city.name));
  }
  return result;
};

// Exporting functions (adapt this based on environment)
if (isNode) {
  module.exports = {
    fetchAllCountries,
    fetchAllStates,
    fetchAllCities,
    fetchStatesByCountry,
    fetchCitiesByState
  };
} else {
  window.locationDataKit = {
    fetchAllCountries,
    fetchAllStates,
    fetchAllCities,
    fetchStatesByCountry,
    fetchCitiesByState
  };
}
