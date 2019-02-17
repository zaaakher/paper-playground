import "../styles/index.scss";
import Paper from "paper";
import Kolor from "kolorwheel";
import { getRandomInt, getRandomArbitrary } from "./util";

let w = 1080;
let h = 1080;
let canv = document.getElementById("canv");
canv.setAttribute("width", w);
canv.setAttribute("height", h);

Paper.setup(canv);
let bg = new Paper.Path.Rectangle(new Paper.Point(0, 0), new Paper.Size(w, h));
bg.fillColor = "black";

let ref = Paper.project.view;

let cir = new Paper.Path.Circle(ref.bounds.center, 30);
// cir.strokeColor = "red";
// cir.strokeWidth = 5;

let anchors = [];
let divisions = getRandomInt(5, 20);

for (let i = 0; i < divisions; i++) {
  let line = new Paper.Path.Line(
    ref.bounds.center,
    cir.getPointAt((cir.length / divisions) * i)
  );

  line.scale(getRandomArbitrary(1, 1.3), ref.bounds.center);
  let dot = line.lastSegment;
  anchors.push(dot);

  line.remove();
}

// console.log(anchors);
let path = new Paper.Path(anchors);
// path.bounds.center.set(ref.bounds.center);
// path.strokeColor = "black";
// path.strokeWidth = 5;
path.closed = true;
path.smooth();
for (let i = 0; i < 50; i++) {
  let clonedPath = path.clone();
  clonedPath.scale(0.2 * i);
  clonedPath.strokeColor = "white";
  clonedPath.strokeWidth = 0.1 * i;
  clonedPath.onFrame = function() {
    this.rotate(0.01 * i);
  };
}
