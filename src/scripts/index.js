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
// bg.fillColor = "lightblue";

let ref = Paper.project.view;
const blurrTest = ref => {
  let ratBG = bg.rasterize();
  let circles = [];
  let cir;
  for (let i = 0; i < 10; i++) {
    let cirRadius = getRandomInt(50, 200);
    cir = new Paper.Path.Circle(ref.center, cirRadius);
    let baseColor = new Kolor("33cc66");
    baseColor.l += getRandomInt(0, 50);
    cir.fillColor = baseColor.getHex();
    cir.fillColor.alpha = 0.5;
    circles.push(cir);
    cir.remove();
  }

  ratBG.onLoad = function() {
    let ctx = this.canvas.getContext("2d");
    let circlePlc = new Paper.Path.Circle(ref.center, 200);

    ctx.filter = "blur(20px)";
    circles.map((circle, i) => {
      let dot = new Paper.Path.Circle(
        circlePlc.getPointAt((circlePlc.length / circles.length) * i),
        20
      );
      // dot.fillColor = "red";
      let cirRas = circle.rasterize();
      this.drawImage(
        cirRas.canvas,
        dot.bounds.center.x - circle.bounds.width - 100,
        dot.bounds.center.y - circle.bounds.height - 100,
        100,
        100
      );
      console.log(circle.bounds.width);
      this.visible = true;
    });
  };
};

blurrTest(ref);

const rotatingWobble = ref => {
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
};

// rotatingWobble(ref);
