// index.js
const fs = require('fs');
const path = require('path');

// Load JSON data from files
const loadData = (fileName) => {
  const filePath = path.join(__dirname, 'data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const countries = loadData('countries.json');
const states = loadData('states.json');
const cities = loadData('cities.json');

// Convert a string to a case-insensitive regex
const createRegex = (str) => new RegExp(str, 'i');

const fetchAllCountries = (search = null) => {
  let result = countries;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(country => regex.test(country.name));
  }
  return result;
};

const fetchAllStates = (search = null) => {
  let result = states;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(state => regex.test(state.name));
  }
  return result;
};

const fetchAllCities = (search = null) => {
  let result = cities;
  if (search) {
    const regex = createRegex(search);
    result = result.filter(city => regex.test(city.name));
  }
  return result;
};

const fetchStatesByCountry = (countryCode, search = null) => {
  let result = states.filter(state => state.countryCode === countryCode);
  if (search) {
    const regex = createRegex(search);
    result = result.filter(state => regex.test(state.name));
  }
  return result;
};

const fetchCitiesByState = (stateCode, search = null) => {
  let result = cities.filter(city => city.stateCode === stateCode);
  if (search) {
    const regex = createRegex(search);
    result = result.filter(city => regex.test(city.name));
  }
  return result;
};


module.exports = {
  fetchAllCountries,
  fetchAllStates,
  fetchAllCities,
  fetchStatesByCountry,
  fetchCitiesByState
};
