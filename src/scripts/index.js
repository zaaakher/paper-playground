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
bg.fillColor = "#3B3561";

let ref = Paper.project.view;
const rotatingDots = ref => {
	let rect = bg.clone();
	rect.fillColor = null;
	// rect.strokeColor = "white";
	rect.strokeWidth = 4;
	rect.scale(0.3);
	// rect.rotate(-45);
	let pth = new Paper.Path([
		rect.bounds.topLeft,
		rect.bounds.topRight,
		rect.bounds.bottomRight,
		rect.bounds.bottomLeft
	]);
	pth.rotate(-90);
	pth.strokeColor = "red";
	pth.strokeWidth = 5;
	// pth.closed = true;
	// pth.smooth();
	let divisons = 51;
	let offset = 0;
	let n = 39;
	for (let i = 1; i <= divisons; i++) {
		let cir = new Paper.Path.Circle({
			center: pth.getPointAt((pth.length / divisons) * i),
			radius: 100,
			strokeColor: "blue"
		});
		let dot = new Paper.Path.Circle({
			center: cir.getPointAt(offset),
			radius: 7,
			fillColor: "white"
		});
		cir.rotate(n * i);
		dot.onFrame = function() {
			if (offset <= Math.round(cir.length - 1)) {
				this.bounds.center.set(cir.getPointAt(offset));
				// this.rotate(rotation, cell.bounds.center);
				offset += 0.1;
			} else {
				offset = 0;
			}
		};
		cir.remove();
	}
	pth.remove();
	rect.remove();
};
const createStars = ref => {
	let star;
	let refCir;
	let borderOffset = 200;
	let stars = new Paper.Group();
	for (let i = 0; i < 5; i++) {
		star = new Paper.Path.Circle({
			center: new Paper.Point(
				getRandomInt(0 + borderOffset, ref.bounds.width - borderOffset),
				getRandomInt(0 + borderOffset, ref.bounds.height - borderOffset)
			),
			fillColor: "white",
			radius: 10
		});
		stars.addChild(star);
	}
};
// createStars(ref);
const circlesOnPath = ref => {
	let anchors = [];
	for (let i = 0; i < 10; i++) {
		let pt = new Paper.Point(
			ref.center.x + getRandomInt(-50, 50),
			ref.center.y + i * 50
		);
		anchors.push(pt);
	}

	let path = new Paper.Path({
		segments: anchors,
		// strokeColor: "red",
		strokeWidth: 4
	});
	path.bounds.center.set(ref.center);
	path.smooth();
	let divisions = 20;
	path.rotate(getRandomElement([90, 270]));
	// path.rotate(getRandomElement([0, 90, 180, 360]));
	// path.rotate(getRandomInt(0, 360));

	for (let s = 0; s < divisions; s++) {
		let cir = new Paper.Path.Circle({
			center: path.getPointAt((path.length / divisions) * s),
			fillColor: "red",
			radius: 5 * s,
			opacity: 0.2
		});
	}
};
const rotatedText = ref => {
	let tex = new Paper.PointText(ref.center);
	let divisions = 70;
	// let divisions = getRandomInt(15, 50);
	tex.fillColor = "#EAD94C";
	tex.content = "نجرب عربي";
	// tex.content = "る英字新聞";
	tex.justification = "center";
	tex.fontFamily = "Helvetica, Arial, sans-serif";
	tex.fontSize = 100;
	tex.fontWeight = 100;
	for (let i = 0; i < divisions; i++) {
		let clonedTex = tex.clone();
		clonedTex.rotate((360 / divisions) * i);

		if (i % 2 == 0) {
			clonedTex.fillColor = "#DD7373";
			clonedTex.scale(1.5);
		} else {
			clonedTex.bringToFront();
		}
	}
	tex.remove();
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
const arrayOfCircle = ref => {
	let array = [];
	for (let j = 0; j < 10; j++) {
		let cir = new Paper.Path.Circle({
			center: ref.center,
			radius: 100,
			fillColor: "red",
			opacity: 0.2
		});
		array.push(cir);
	}

	var previous, current, next;
	for (let i = 0; i < array.length; i++) {
		previous = array[i == 0 ? array.length - 1 : i - 1];
		current = array[i];
		next = array[i == array.length - 1 ? 0 : i + 1];
		current.bounds.center.x += 20 * i;
	}
};
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

	tempLine.remove();
	let path = new Paper.Path({
		segments: anchors,
		strokeColor: "white",
		strokeWidth: 10
	});
	path.smooth();
	let rotations = 25;
	// let geoMix = new Paper.Group();
	for (let i = 0; i < rotations; i++) {
		let clonedPath = path.clone();
		clonedPath.rotate((360 / rotations) * i, ref.center);
		// geoMix.addChild(clonedPath);
		clonedPath.onFrame = function() {
			this.rotate(0.1 * i, ref.center);
		};
	}
	path.remove();
};

rotatingDots(ref);
