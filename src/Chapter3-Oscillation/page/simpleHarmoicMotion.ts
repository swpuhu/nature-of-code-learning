import P5 from "p5";
import { Oscillator } from "../Oscillator";

function sketch() {
    return {};
}

const p = new P5(sketch, document.body);
let angle = 0;
let aVelocity = 0.05;

let oscillator: Oscillator;
const oscillators: Oscillator[] = [];

p.preload = function () {
    console.log(this);
};

p.setup = function () {
    p.createCanvas(640, 360);
    for (let i = 0; i < 10; i++) {
        oscillators.push(new Oscillator(p));
    }
};

p.draw = function () {
    p.background(255, 100);
    oscillators.forEach((oscillator) => {
        oscillator.oscillate();
        oscillator.display();
    });
    // const period = 120;
    // const amplitude = 100;
    // const x = amplitude * p.sin(angle);
    // angle += aVelocity;
    // p.fill(175);
    // p.stroke(0);
    // p.ellipseMode(p.CENTER);
    // p.translate(p.width / 2, p.height / 2);
    // p.line(0, 0, x, 0);
    // p.circle(x, 0, 20);

    // aVelocity += aAcceleration;
    // angle += aVelocity;
};
