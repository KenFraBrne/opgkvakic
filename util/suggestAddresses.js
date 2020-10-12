export default function suggestAddreses(address){
  const url = new URL("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest");
  url.searchParams.append('text', address);
  url.searchParams.append('f', 'json');
  return fetch(url.toString());
}
