import P5 from "p5";
import { Mover } from "../Mover";

function sketch() {
    return {
        a: 2,
    };
}

const p = new P5(sketch, document.body);

let mover: Mover;
const movers: Mover[] = [];

p.preload = function () {
    console.log(this);
};

p.setup = function () {
    p.createCanvas(640, 360);
    for (let i = 0; i < 10; i++) {
        movers.push(
            new Mover(
                p,
                p.random(0, p.width),
                p.random(50, p.height),
                p.random(2, 8)
            )
        );
    }
    // mover = new Mover(p, 100, 20, 3);
};

p.draw = function () {
    p.clear();

    const grivityAcc = p.createVector(0.0, 0.2);
    if (p.mouseIsPressed) {
        const windForce = p.createVector(1.0, 0.0);
        movers.forEach((mover) => mover.applyForce(windForce));
    }
    movers.forEach((mover) => {
        mover.applyAcceleration(grivityAcc);
        mover.update();
        mover.display();
    });
};
