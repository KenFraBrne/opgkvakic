import searchAddress from 'util/searchAddress';
import inPolygon from 'util/inPolygon';
import geojson from 'data/area.json';

export default function inDeliveryArea(address){
  return searchAddress(address)
    .then( addressVerbose => {
      const { lon, lat } = addressVerbose;
      const [ polygon ] = geojson.geometry.coordinates;
      const inArea = inPolygon( [lon, lat], polygon );
      return {
        inArea,
        addressVerbose,
      }
    });
};
