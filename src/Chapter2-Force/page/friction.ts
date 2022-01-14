import P5 from "p5";
import { Liquid } from "../Liquid";
import { Mover } from "../Mover";

function sketch() {
    return {
        a: 2,
    };
}

const p = new P5(sketch, document.body);

let mover: Mover;
const movers: Mover[] = [];
let liquid: Liquid;
p.preload = function () {
    console.log(this);
};

p.setup = function () {
    p.createCanvas(640, 360);
    liquid = new Liquid(p, 0, p.height / 2, p.width, p.height / 2, 0.1);
    for (let i = 0; i < 10; i++) {
        movers.push(
            new Mover(
                p,
                p.random(0, p.width),
                p.random(0, p.height - 200),
                p.random(2, 10)
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

    liquid.display();
    movers.forEach((mover) => {
        mover.applyAcceleration(grivityAcc);
        if (mover.concactEdge()) {
            const c = 0.1 * mover.mass;
            const friction = mover.velocity.copy().normalize();
            friction.mult(-1);
            friction.setMag(c);
            mover.applyForce(friction);
        }

        if (liquid.contains(mover)) {
            liquid.drag(mover);
        }
        mover.update();
        mover.display();
    });
};
