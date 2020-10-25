/**
 * Get arcGIS suggestions from address form input value
 *
 * @param {string} address - the value of the address form input
 * @return {Promise<string[]>} response - the cleaned arcGIS response
 */
export default function suggestAddreses(address){

  // create url from the address value
  const url = new URL("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest");
  url.searchParams.append('f', 'json');
  url.searchParams.append('text', address);
  url.searchParams.append('category', 'Address');
  url.searchParams.append('countryCode', 'HRV');
  url.searchParams.append('maxSuggestions', '3');

  // return fetch response
  const response = fetch(url.toString())
    .then(res => res.json())
    .then(res => {
      // get suggestion values
      return res.suggestions.map( val => val.text );
    })
    .then(addresses => {
      // remove redundant information that confuses nominatim
      return addresses.map( address => address.split(',').slice(0, -2).join(', ') );
    });
  return response;
}
