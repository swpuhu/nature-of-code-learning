import P5 from "p5";
import { Attractor } from "../Attractor";
import { Mover } from "../Mover";

function sketch() {
    return {
        a: 2,
    };
}

const p = new P5(sketch, document.body);

let mover: Mover;
const movers: Mover[] = [];
let attractor: Attractor;
p.setup = function () {
    p.createCanvas(640, 360);
    for (let i = 0; i < 10; i++) {
        const mover = new Mover(
            p,
            p.random(0, p.width),
            p.random(0, p.height),
            p.random(1, 8)
        );
        mover.velocity = p.createVector(p.random(), p.random());
        mover.velocity.setMag(1);

        movers.push(mover);
    }
    // mover = new Mover(p, 300, 100, 3);
    attractor = new Attractor(p, 320, 180, 20);
};

p.draw = function () {
    p.background(255, 50);
    attractor.display();
    movers.forEach((mover) => {
        const force = attractor.attract(mover);
        mover.applyForce(force);
        mover.update();
        mover.display();
    });
};
