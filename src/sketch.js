// Pi Day Leibniz Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/140-leibniz-formula-pi
// https://editor.p5js.org/codingtrain/sketches/8nvCqk0-W
// https://youtu.be/uH4trBNn540

//Edited by George Campbell to include the average of the last 2 iterations,
//and the difference from PI (abs)

let pi = 4;
let iterations = 0;
let history = [];
let div, divAvgY, divDiff;

let minY = 2;
let maxY = 4;

function setup() {
  createCanvas(600, 400);
  div = createDiv('').style('font-size', '64pt');
	divAvgY = createDiv('').style('font-size', '64pt');
	divDiff = createDiv('').style('font-size', '64pt');
	console.log(PI);
	frameRate(12);
}

function draw() {
  background(0);
  let den = iterations * 2 + 3;
  if (iterations % 2 == 0) {
    pi -= (4 / den);
  } else {
    pi += (4 / den);
  }
  history.push(pi);

  //let piY = map(PI, minY, maxY, height, 0);
  //line(0, piY, width, piY);
	let historyAvg = getAverage(history.slice(-2));//getAverage(history.slice(Math.round(history.length/2)));
	let yAvg = map(historyAvg, minY, maxY, height, 0);
	line(0,yAvg, width, yAvg);
	strokeCap(ROUND);
  stroke(255);
  noFill();
  beginShape();
  let spacing = width / history.length;
  for (let i = 0; i < history.length; i++) {
    let x = i * spacing;
    let y = map(history[i], minY, maxY, height, 0);
    vertex(x, y);
  }
  endShape();
  div.html(pi);//last iteration value
	divAvgY.html(historyAvg+" (Average of last 2 iterations)");//average of last 2 iteration values
	divDiff.html((Math.abs(historyAvg-PI)).toPrecision(8)+" (Difference to PI (abs))");//difference from PI (abs)
  iterations++;
}
function getAverage(arr){
	return arr.reduce((acc, val) => acc+val, 0)/arr.length;
}
