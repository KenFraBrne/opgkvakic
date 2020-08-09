var fs = require("fs");

const n = 50;
const deliveries = Array(n).fill(0).map(() => {
  const id = Array(10).fill(0).map(() => {
    var num = Math.random()*(90-48)+48;
    var char = String.fromCharCode(num);
    return char;
  });
  const month = 7;//Math.random()*12;
  const date = Math.random()*31;
  const hour = Math.random()*24;
  const from = new Date(2020, month, date, hour);
  const until = new Date(2020, month, date, hour+2);
  const places = Math.floor(Math.random()*20);
  return {
    id: id.join(''),
    from: from.getTime(),
    until: until.getTime(),
    places: places,
  };
});

fs.writeFile("./deliveries.json", JSON.stringify(deliveries, null, 2), () => {});
