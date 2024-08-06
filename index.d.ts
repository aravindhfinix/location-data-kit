// index.d.ts

export interface Country {
    code: string;
    name: string;
  }
  
  export interface State {
    code: string;
    name: string;
    countryCode: string;
  }
  
  export interface City {
    name: string;
    stateCode: string;
  }
  
  /**
   * Fetch all countries with optional search.
   * @param search Optional search string to filter country names.
   * @returns Array of Country objects.
   */
  export function fetchAllCountries(search?: string): Country[];
  
  /**
   * Fetch all states with optional search.
   * @param search Optional search string to filter state names.
   * @returns Array of State objects.
   */
  export function fetchAllStates(search?: string): State[];
  
  /**
   * Fetch all cities with optional search.
   * @param search Optional search string to filter city names.
   * @returns Array of City objects.
   */
  export function fetchAllCities(search?: string): City[];
  
  /**
   * Fetch states by country code with optional search.
   * @param countryCode The code of the country to filter states.
   * @param search Optional search string to filter state names.
   * @returns Array of State objects.
   */
  export function fetchStatesByCountry(countryCode: string, search?: string): State[];
  
  /**
   * Fetch cities by state code with optional search.
   * @param stateCode The code of the state to filter cities.
   * @param search Optional search string to filter city names.
   * @returns Array of City objects.
   */
  export function fetchCitiesByState(stateCode: string, search?: string): City[];
  