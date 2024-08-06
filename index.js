const countries = require('./data/countries.js');
const states = require('./data/states');
const cities = require('./data/cities');

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

// Exporting functions
module.exports = {
  fetchAllCountries,
  fetchAllStates,
  fetchAllCities,
  fetchStatesByCountry,
  fetchCitiesByState
};
