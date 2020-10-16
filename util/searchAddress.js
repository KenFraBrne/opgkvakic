export default function searchAddress(address){

  // treat output from arcgis
  const [ street, postalcode, city, ..._ ] = address.split(', ');
  const re = /\d+/;
  const number = re.test(street) ? re.exec(street)[0] : '';
  const name = number.length > 0 ? street.replace(` ${number}`, '') : street;

  // nominatim get request
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.append('street', number.length > 0 ? `${number} ${name}` : name);
  url.searchParams.append('city', city);
  url.searchParams.append('postalcode', postalcode);
  url.searchParams.append('countrycodes', 'hr');
  url.searchParams.append('addressdetails', '1');
  url.searchParams.append('format', 'json');
  url.searchParams.append('limit', '1');

  // response promise
  const response = fetch(url.toString())
    .then(res => res.json())
    .then(res => {
      // extract info
      const { address, lon, lat } = res[0];
      return { ...address, lon, lat };
    })
    .then(res => {
      // change string numbers to Number
      const entries = Object.entries(res);
      return entries.reduce( ( obj, entry ) => {
        const [ key, val ] = entry;
        if ( Number(val) ) return {...obj, [ key ]: Number(val)};
        else return {...obj, [key]: val}
      }, {})
    });
  return response;
}
