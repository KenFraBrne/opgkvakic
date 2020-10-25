import searchAddress from 'util/addressAutocomplete/searchAddress';
import inPolygon from 'util/addressAutocomplete/inPolygon';
import geojson from 'data/area.json';

/**
 * Test if arcGIS address is in delivery area
 *
 * @param {string} address - arcGIS suggest result
 * @return {Promise<Object>} response
 */
export default function inDeliveryArea(address){
  const response = searchAddress(address)
    .then( addressVerbose => {
      const { lon, lat } = addressVerbose;
      const [ polygon ] = geojson.geometry.coordinates;
      const inArea = inPolygon( [lon, lat], polygon );
      return {
        inArea,
        addressVerbose,
      }
    });
  return response;
};
