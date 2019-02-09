import "../styles/index.scss";
import Paper from "paper";
import Kolor from "kolorwheel";

let canv = document.getElementById("canv");
canv.setAttribute("width", 500);
canv.setAttribute("height", 500);

Paper.setup(canv);
let bg = new Paper.Path.Rectangle(new Paper.Point(0, 0), 500);
// bg.fillColor = "lightblue";
let cir = new Paper.Path.Circle(bg.bounds.center, 10);
// cir.fillColor = "red";
var text = new Paper.PointText(bg.bounds.center);
text.justification = "center";
text.content = "Text";
text.fontSize = 20;
text.fontWeight = 800;
text.bounds.center.set(bg.bounds.center);

let baseColor = new Kolor("#C0DA74");
text.fillColor = baseColor.getHex();
for (let i = 0; i < 10; i++) {
  baseColor.h += 20;
  let t = text.clone();
  t.fillColor = baseColor.getHex();
  t.position.x += i * 5;
  t.position.y += i * 5;
}
