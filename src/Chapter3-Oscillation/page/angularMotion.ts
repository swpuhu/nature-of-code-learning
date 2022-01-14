import P5 from "p5";

function sketch() {
    return {};
}

const p = new P5(sketch, document.body);
let angle = 0;
let aVelocity = 0;
let aAcceleration = 0.0001;

p.preload = function () {
    console.log(this);
};

p.setup = function () {
    p.createCanvas(640, 360);
};

p.draw = function () {
    p.background(255);

    p.fill(175);
    p.stroke(0);
    p.rectMode(p.CENTER);

    p.translate(p.width / 2, p.height / 2);
    p.rotate(angle);
    p.line(-50, 0, 50, 0);
    p.circle(50, 0, 8);
    p.circle(-50, 0, 8);

    aVelocity += aAcceleration;
    angle += aVelocity;
};
