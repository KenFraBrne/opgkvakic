export default function searchAddress(address){
  const [ street, postalcode, city, county, ...rest ] = address.split(', ');
  const re = /\d+/;
  const number = re.test(street) ? re.exec(street)[0] : '';
  const name = number.length > 0 ? street.replace(` ${number}`, '') : street;
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.append('street', number.length > 0 ? `${number} ${name}` : name);
  url.searchParams.append('city', city);
  url.searchParams.append('county', county);
  url.searchParams.append('postalcode', postalcode);
  url.searchParams.append('countrycodes', 'hr');
  url.searchParams.append('format', 'json');
  url.searchParams.append('limit', '1');
  return fetch(url.toString());
}
