module.exports = function inPolygon( point, polygon ){
  const [ x, y ] = point;
  const counter = (polygon) => {
    const [ x0, y0 ] = polygon[0];
    const [ x1, y1 ] = polygon[1];
    const inc = ( y > y0 !== y > y1 ) && ( x < x0+(y-y0)*(x1-x0)/(y1-y0) );
    if (polygon.length == 2) return Number(inc);
    else return Number(inc) + counter(polygon.slice(1));
  }
  return counter(polygon)%2 === 1;
}
