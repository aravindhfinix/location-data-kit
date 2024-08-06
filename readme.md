## Location Data Kit

This is a Node.js package that provides functions to access and search location data including countries, states, and cities.

### Features

* Loads location data from pre-defined JSON files.
* Provides functions to:
    * Fetch all countries.
    * Search for countries by name (case-insensitive).
    * Fetch all states.
    * Search for states by name (case-insensitive).
    * Fetch all cities.
    * Search for cities by name (case-insensitive).
    * Fetch states belonging to a specific country.
    * Search for states belonging to a specific country (case-insensitive).
    * Fetch cities belonging to a specific state.
    * Search for cities belonging to a specific state (case-insensitive).

### Installation

```bash
npm install location-data-kit
```

### Usage

```javascript
const LocationDataKit = require('location-data-kit');

// Fetch all countries
const allCountries = LocationDataKit.fetchAllCountries();
console.log('All Countries:', allCountries);

// Search for countries by name (case-insensitive)
const searchTerm = "France";
const countriesWithName = LocationDataKit.fetchAllCountries(searchTerm);
console.log('Countries with name:', countriesWithName);

// Fetch all states in a specific country
const countryCode = "US";  // Change this to your desired country code
const statesInUS = LocationDataKit.fetchStatesByCountry(countryCode);
console.log('States in US:', statesInUS);

// Search for states in a specific country by name (case-insensitive)
const stateSearchTerm = "California";
const statesInUSWithName = LocationDataKit.fetchStatesByCountry(countryCode, stateSearchTerm);
console.log('States in US with name:', statesInUSWithName);

// Fetch all cities in a specific state
const stateCode = "CA"; // Change this to your desired state code
const citiesInCA = LocationDataKit.fetchCitiesByState(stateCode);
console.log('Cities in CA:', citiesInCA);

// Search for cities in a specific state by name (case-insensitive)
const citySearchTerm = "Los Angeles";
const citiesInCAWithName = LocationDataKit.fetchCitiesByState(stateCode, citySearchTerm);
console.log('Cities in CA with name:', citiesInCAWithName);
```

### Data Files

This package expects three JSON files to be present in the `data` folder within the package directory:

* `countries.json`: An array of objects representing countries, each object should have properties like `name` and optionally `code`.
* `states.json`: An array of objects representing states, each object should have properties like `name`, `countryCode` (referencing a country from `countries.json`).
* `cities.json`: An array of objects representing cities, each object should have properties like `name`, `stateCode` (referencing a state from `states.json`).

**Please note:** You need to provide your own data for these files or use existing datasets formatted as mentioned above.


## License

This package is licensed under the MIT License. See the LICENSE file for details.
