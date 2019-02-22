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
bg.fillColor = "lightblue";
// bg.fillColor = new Kolor([
//   getRandomInt(0, 100),
//   getRandomInt(0, 100),
//   getRandomInt(0, 100)
// ]).getHex();

let ref = Paper.project.view;

let randomPolygonCir = circle => {
  let offset = 10;
  let pt1 = new Paper.Point(
    circle.getPointAt(getRandomInt(0, circle.length) - offset)
  );
  offset += 10;
  let pt2 = new Paper.Point(
    circle.getPointAt(getRandomInt(0, circle.length) - offset)
  );
  offset += 10;
  let pt3 = new Paper.Point(
    circle.getPointAt(getRandomInt(0, circle.length) - offset)
  );
  offset += 10;
  let pt4 = new Paper.Point(
    circle.getPointAt(getRandomInt(0, circle.length) - offset)
  );
  offset += 10;
  let path = new Paper.Path([pt1, pt2, pt3, pt4]);
  path.fillColor = "red";
  path.fillColor.alpha = 0.2;
  path.closed = true;
  path.strokeWidth = 0;
  path.smooth();
};
let randomPolygonRect = rectangle => {
  let path = new Paper.Path([
    new Paper.Point(
      rectangle.bounds.topLeft.x,
      getRandomInt(rectangle.bounds.topLeft.y, rectangle.bounds.bottomLeft.x)
    ), //topLeft point
    new Paper.Point(
      rectangle.bounds.topRight.x,
      getRandomInt(rectangle.bounds.topRight.y, rectangle.bounds.bottomRight.x)
    ), //bottomLeft point
    new Paper.Point(
      rectangle.bounds.topRight.x,
      getRandomInt(rectangle.bounds.topRight.y, rectangle.bounds.bottomRight.y)
    ), //topRight point
    new Paper.Point(
      rectangle.bounds.topLeft.x,
      getRandomInt(rectangle.bounds.topLeft.y, rectangle.bounds.bottomLeft.y)
    ) //bottomRight point
  ]);
  let color = new Kolor([
    getRandomInt(0, 100),
    getRandomInt(0, 100),
    getRandomInt(0, 100)
  ]);
  color.h = getRandomInt(5, 125);
  path.fillColor = color.getHex();
  path.fillColor.alpha = 0.3;
  path.closed = true;
  path.strokeWidth = 0;
  path.smooth();
};
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
const rotatingWobble = ref => {
  let cir = new Paper.Path.Circle(ref.bounds.center, 30);
  // cir.strokeColor = "red";
  // cir.strokeWidth = 5;
  let anchors = [];
  let divisions = getRandomInt(5, 20);
  // let divisions = 5;

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
  let rotationAngle = divisions <= 5 ? 5 : 2;
  for (let i = 0; i < 50; i++) {
    let clonedPath = path.clone();
    clonedPath.scale(0.2 * i);
    clonedPath.strokeColor = "white";
    clonedPath.strokeWidth = 0.1 * i;

    // clonedPath.onFrame = function() {
    // if (this.rotation <= 20) {
    clonedPath.rotation = rotationAngle * i;
    // }

    // console.log(this.getRotation());

    // this.rotate(0.01 * i);
    // };
  }
};

// blurrTest(ref);
// rotatingWobble(ref);

let anchors = [];
for (let i = 0; i < 10; i++) {
  let pt = new Paper.Point(ref.center.x + i * 30, ref.center.y + i * 50);
  anchors.push(pt);
}
console.log(anchors);

anchors.map(point => {
  point.x += getRandomInt(10, 500);
});

let path = new Paper.Path({
  segments: anchors,
  strokeColor: "red",
  strokeWidth: 2
});

path.bounds.center.set(ref.center);
path.smooth();

let divisions = 20;

for (let j = 0; j < divisions; j++) {
  let cir = new Paper.Path.Circle(
    path.getPointAt((path.length / divisions) * j),
    50
  );
  cir.fillColor = "red";
}
