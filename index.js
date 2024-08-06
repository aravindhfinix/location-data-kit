const isNode = typeof window === 'undefined';

// Load JSON data depending on the environment
const loadData = async (url) => {
  if (isNode) {
    // Node.js environment
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'data', url);

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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

// Data loading (adjust based on environment)
const loadDataPromises = [
  loadData(getPath('countries.json')),
  loadData(getPath('states.json')),
  loadData(getPath('cities.json'))
];

let countries = [];
let states = [];
let cities = [];

// Wait for all data to be loaded
Promise.all(loadDataPromises)
  .then(([countriesData, statesData, citiesData]) => {
    countries = countriesData;
    states = statesData;
    cities = citiesData;
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

// Helper function to create case-insensitive regex
const createRegex = (str) => new RegExp(str, 'i');

// Fetch all countries with optional search
const fetchAllCountries = (search = null) => {
  let result = countries;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(country => regex.test(country.name));
  }
  return result;
};

// Fetch all states with optional search
const fetchAllStates = (search = null) => {
  let result = states;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(state => regex.test(state.name));
  }
  return result;
};

// Fetch all cities with optional search
const fetchAllCities = (search = null) => {
  let result = cities;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(city => regex.test(city.name));
  }
  return result;
};

// Fetch states by country code with optional search
const fetchStatesByCountry = (countryCode, search = null) => {
  let result = states.filter(state => state.countryCode === countryCode);
  if (search) {
    const regex = createRegex(search);
    result = result.filter(state => regex.test(state.name));
  }
  return result;
};

// Fetch cities by state code with optional search
const fetchCitiesByState = (stateCode, search = null) => {
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
