import p5 from "p5";
import { Mover } from "./Mover";

const G = 6.67428e-11;

export class Attractor {
    position: p5.Vector = null;
    radius: number = 0;
    constructor(
        public p: p5,
        public x: number,
        public y: number,
        public mass = 20
    ) {
        this.position = p.createVector(x, y);
        this.radius = this.mass * 4;
    }

    attract(m: Mover) {
        const force = p5.Vector.sub(this.position, m.position);
        let distance = force.mag();
        distance = this.p.constrain(distance, 5, 25);
        const strength = G * this.mass * m.mass / (distance * distance) * 1e10;
        force.setMag(strength);
        return force;
    }

    display() {
        this.p.stroke(0);
        this.p.fill(175, 200);
        this.p.ellipse(this.position.x, this.position.y, this.radius * 2);
    }


}
