export default function suggestAddreses(address){
  const url = new URL("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest");
  url.searchParams.append('f', 'json');
  url.searchParams.append('text', address);
  url.searchParams.append('category', 'Address');
  url.searchParams.append('countryCode', 'HRV');
  url.searchParams.append('maxSuggestions', '3');
  return fetch(url.toString());
}
