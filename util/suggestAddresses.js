export default function suggestAddreses(address){
  const url = new URL("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest");
  url.searchParams.append('f', 'json');
  url.searchParams.append('text', address);
  url.searchParams.append('category', 'Address');
  url.searchParams.append('countryCode', 'HRV');
  url.searchParams.append('maxSuggestions', '3');
  return fetch(url.toString())
    .then(res => res.json())
    .then(res => {
      return res.suggestions.map( val => val.text );
    })
    .then(addresses => {
      return addresses.map( address => address.split(',').slice(0, -2).join(', ') );
    });
}
