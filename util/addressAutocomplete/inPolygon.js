/**
 * Tests if point is in polygon (based on https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html)
 *
 * @param {number[]} point - [x, y]
 * @param {number[][]} polygon - [[x0, y0], ...]
 * @return {boolean} isInPolygon
*/
module.exports = function inPolygon( point, polygon ){
  const [ x, y ] = point;
  const counter = (polygon) => {
    const [ x0, y0 ] = polygon[0];
    const [ x1, y1 ] = polygon[1];
    const inc = ( y > y0 !== y > y1 ) && ( x < x0+(y-y0)*(x1-x0)/(y1-y0) );
    if (polygon.length == 2) return Number(inc);
    else return Number(inc) + counter(polygon.slice(1));
  }
  const isInPolygon = counter(polygon)%2 === 1;
  return isInPolygon;
}
