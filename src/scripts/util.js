import Paper from "paper";
import * as d3 from "d3";

const createCanvas = (w, h) => {
  //Create Canvas
  let canvas = d3
    .select("body") //Select body element
    .append("canvas") //Append a canvas element
    .attr("class", "canv")
    .attr("width", w) //set width
    .attr("height", h); // set height
  // console.log(canvas.node().offsetWidth);
  canvas.node().style.width = w + "px";
  canvas.node().style.height = h + "px";

  // canvas.node().offsetHeight
  return canvas;
};
const setupCanvas = (canvW, canvH) => {
  new Paper.Project(createCanvas(canvW, canvH).node());
  new Paper.Path.Rectangle(0, 0, canvW, canvH);
};
const createSliders = defaultValues => {
  //New div to contain the sliders
  let controls = d3.select("body").append("div");
  controls.attr("class", "controls");

  //Create slider divs and connect data
  let sliders = d3
    .select(".controls") //select parent element
    .selectAll("div")
    .data(Object.keys(defaultValues))
    .enter()
    .append("div"); //Add a div for each item in the data

  //Create text for slider label
  sliders.append("text").text(d => defaultValues[d].title);
  //Create sliders
  sliders
    .append("input") //n
    .attr("type", "range")
    .attr("min", d => defaultValues[d].min) //min value
    .attr("value", d => defaultValues[d].val)
    .attr("max", d => defaultValues[d].max); //max value
};
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var downloadAsSVG = function(fileName) {
  if (!fileName) {
    fileName = "paperjs_example.svg";
  }
  var url =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(Paper.project.exportSVG({ asString: true }));

  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};
const getRandomElement = arr => arr[getRandomInt(0, arr.length - 1)];
const remapNumbers = (value, sourceRange, targetRange) => {
  let oldRange = sourceRange[1] - sourceRange[0];
  let newRange = targetRange[1] - targetRange[0];
  return ((value - sourceRange[0]) * newRange) / oldRange + targetRange[0];
};

export {
  getRandomElement,
  remapNumbers,
  getRandomInt,
  downloadAsSVG,
  getRandomArbitrary,
  createSliders,
  createCanvas,
  setupCanvas
};
