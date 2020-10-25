/**
 * Geocode arcGIS' result with nominatim
 *
 * @param {string} address - arcGIS suggest result
 * @return {Promise<Object>} response - nominatim's response as a Promise
 */
export default function searchAddress(address: string): Promise<any>;
