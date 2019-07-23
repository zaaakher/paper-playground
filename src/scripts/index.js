import "../styles/index.scss";
import Paper from "paper";
import Kolor from "kolorwheel";
import { getRandomInt, getRandomArbitrary, getRandomElement } from "./util";

let w = 1080;
let h = 1080;
let canv = document.getElementById("canv");
canv.setAttribute("width", w);
canv.setAttribute("height", h);

Paper.setup(canv);
let bg = new Paper.Path.Rectangle(new Paper.Point(0, 0), new Paper.Size(w, h));
bg.fillColor = "black";
// bg.fillColor = new Kolor([
//   getRandomInt(0, 100),
//   getRandomInt(0, 100),
//   getRandomInt(0, 100)
// ]).getHex();
let ref = Paper.project.view;

const rotatedSmoothedPoly = ref => {
	let poly = new Paper.Path.RegularPolygon(ref.center, 3, 200);
	poly.strokeWidth = 2;
	poly.strokeColor = "white";
	poly.smooth();
	for (let i = 0; i < 5; i++) {
		let copyPoly = poly.clone();
		copyPoly.rotate(getRandomInt(20, 300) * i);
	}
};
const dashedCircles = ref => {
	for (let i = 0; i < 10; i++) {
		let cir = new Paper.Path.Circle({
			center: ref.center,
			radius: 50 * i,
			strokeColor: "white",
			strokeWidth: 55,
			dashArray: [
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100),
				getRandomInt(0, 100)
			]
		});
		let rot = getRandomArbitrary(-0.5, 0.5);
		cir.onFrame = function() {
			this.rotate(rot);
		};
	}
};
const wavyLines = ref => {
	// let circlesGroup = new Paper.Group();
	let rect = new Paper.Path.Rectangle(
		new Paper.Point(0, 0),
		new Paper.Size(100, 1100)
	);
	rect.fillColor = "blue";
	rect.bounds.center.set(ref.center);
	let line = new Paper.Path([
		new Paper.Point(rect.bounds.topCenter.x, rect.bounds.topCenter.y),
		new Paper.Point(rect.bounds.bottomCenter.x, rect.bounds.bottomCenter.y)
	]);
	line.strokeColor = "red";
	line.strokeWidth = 30;
	let anchors = [];
	for (let i = 0; i <= 10; i++) {
		let pt = line.getPointAt((line.length / 10) * i);
		pt.x += getRandomInt(-50, 50);
		let cir = new Paper.Path.Circle({
			center: pt,
			radius: 10,
			fillColor: "yellow"
		});
		anchors.push(pt);
		cir.remove();
		// circlesGroup.addChild(cir);
	}
	line.remove();
	rect.remove();
	let wave = new Paper.Path(anchors);
	wave.strokeColor = "white";
	wave.strokeWidth = 10;
	wave.strokeCap = "round";
	wave.smooth();
	let waveGroup = new Paper.Group();
	for (let k = 0; k < 30; k++) {
		let m = wave.clone();
		m.position.x += 20 * k;
		waveGroup.addChild(m);
	}
	wave.remove();
	waveGroup.bounds.center.set(ref.center);
	let offset = 0;
	let forwardMvmnt = true;

	waveGroup.children.map((wave, j) => {
		// wave.onFrame = function() {
		// this.segments.map((seg, i) => {
		// console.log(this.bounds);
		// let path = circlesGroup.children[i];
		// console.log(this.bounds.point);
		// if (offset == 0) {
		//   forwardMvmnt = true;
		// } else if (offset == Math.round(path.length) - 1) {
		//   forwardMvmnt = false;
		//   // offset--;
		// }
		// console.log(forwardMvmnt);
		// if (forwardMvmnt == true) {
		// this.bounds.point.set(path.getPointAt(offset));
		// offset++;
		// } else if (forwardMvmnt == false) {
		// this.bounds.point.set(path.getPointAt(offset));
		//   offset--;
		// }
		// });
		// };
	});
};
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
	for (let i = 0; i < 60; i++) {
		let clonedPath = path.clone();
		clonedPath.scale(0.2 * i);
		clonedPath.strokeColor = "white";
		clonedPath.strokeWidth = 0.1 * i;

		clonedPath.rotation = rotationAngle * i;
		// clonedPath.dashArray = [5, 5, 5, 5, 5, 5];
		// // clonedPath.dashOffset = 20;
		// clonedPath.onFrame = function() {
		//   this.dashOffset += 0.1 * i;
		// };
	}
};
const circlesOnPath = ref => {
	let anchors = [];
	for (let i = 0; i < 10; i++) {
		let pt = new Paper.Point(ref.center.x + i * 30, ref.center.y + i * 50);
		anchors.push(pt);
	}
	console.log(anchors);

	anchors.map(point => {
		point.x += getRandomInt(10, 100);
	});

	let path = new Paper.Path({
		segments: anchors,
		// strokeColor: "red",
		strokeWidth: 2
	});

	path.bounds.center.set(ref.center);
	path.smooth();

	let divisions = 20;

	for (let j = 0; j < divisions; j++) {
		let cir = new Paper.Path.Circle(
			path.getPointAt((path.length / divisions) * j),
			10 * j
		);
		cir.fillColor = "red";
		cir.fillColor.alpha = 0.2;
	}
};
const circleLoop = ref => {
	let anchors = [];
	for (let i = 0; i < getRandomInt(5, 10); i++) {
		let cir = new Paper.Path.Circle({
			center: ref.center,
			radius: i * 50,
			// fillColor: "red",
			opacity: 0.1
		});
		// anchors.push(cir.getPointAt(getRandomInt(0, cir.length - 1)));
		anchors.push(cir.getPointAt((cir.length / getRandomInt(10, 20)) * i));
	}
	console.log(anchors);
	let path = new Paper.Path({
		segments: anchors,
		strokeColor: "black",
		// opacity: 0.5,
		strokeCap: "round",
		strokeWidth: 10
	});

	path.smooth();
	let divs = 20;

	for (let j = 0; j < divs; j++) {
		let s = path.clone();
		s.rotate((360 / divs) * j, ref.center);
		s.onFrame = function() {
			this.rotate(1);
			// let canv = Paper.project.view.element;
			// let ctx = canv.getContext("2d");
			// encoder.addFrame(ctx);
		};
	}
	path.remove();
};
const rotatingGeomix = ref => {
	let tempLine = new Paper.Path({
		segments: [ref.center, new Paper.Point(ref.center.x + 1000, ref.center.y)]
	});
	// tempLine.rotate(getRandomInt(0, 360), ref.center);
	// tempLine.strokeColor = "white";
	// tempLine.strokeWidth = 5;
	let divisions = 20;
	let anchors = [];
	let zigzagLimit = 200;
	for (let i = 0; i < divisions + 1; i++) {
		// let offset = tempLine.length / 5;
		let offset = (i / divisions) * tempLine.length;
		let pt = tempLine.getPointAt(offset);
		let dot = new Paper.Path.Circle(pt, 10);
		let normal = tempLine.getNormalAt(offset) * 30;
		dot.fillColor = "red";
		let normalLine = new Paper.Path({
			segments: [pt, pt + normal],
			strokeColor: "white",
			strokeWidth: 5
		});
		pt.x += getRandomInt(-zigzagLimit, zigzagLimit);
		pt.y += getRandomInt(-zigzagLimit, zigzagLimit);
		anchors.push(pt);
		normalLine.remove();
		dot.remove();
	}
};
// rotatingWobble(ref);
// wavyLines(ref);
// dashedCircles(ref);
// circleLoop(ref);
rotatedSmoothedPoly(ref);
