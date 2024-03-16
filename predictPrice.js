const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let x, y;
let k;
let N;
let points = [];

rl.on('line', (line) => {
  const data = line.split(' ').map(Number);
  if (!x) {
    [x, y] = data;
  } else if (!k) {
    k = data[0];
  } else if (!N) {
    N = data[0];
  } else {
    points.push({
      x: data[0],
      y: data[1],
      price: data[2],
    });
    if (points.length === N) {
      predictPrice();
      rl.close();
    }
  }
});

function predictPrice() {
  const distances = points.map((point) => ({
    distance: Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2)),
    price: point.price,
  }));
  distances.sort((a, b) => a.distance - b.distance);
  const sumPrice = distances
    .slice(0, k)
    .reduce((sum, point) => sum + point.price, 0);
  const predictedPrice = Math.round(sumPrice / k);
  console.log(predictedPrice);
}
