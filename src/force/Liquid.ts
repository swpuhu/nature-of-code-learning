import p5 from "p5";
import { Mover } from "./Mover";

/**
 * @description 
 * can simulate liquid friction
 * according to formula:
 * 
 * Fd = -0.5 * p * v2 * A * Cd * vec
 * where:
 *  p, A regard as constant
 *  Cd regard as friction coeffecient.
 * 
 * so simplify this formula as below:
 * Fd = v2 * Cd * vec 
 */
export class Liquid {
    constructor(
        public p: p5,
        public x: number,
        public y: number,
        public w: number,
        public h: number,
        public c: number
    ) {}

    contains(mover: Mover) {
        const pos = mover.position.copy();

        // 未考虑mover的大小
        return (
            pos.x > this.x &&
            pos.x < this.x + this.w &&
            pos.y > this.y &&
            pos.y < this.y + this.h
        );
    }

    drag(mover: Mover) {
        const speed = mover.velocity.mag();
        const dragMagnitude = -this.c * speed * speed; 
        const drag = mover.velocity.copy();
        drag.setMag(dragMagnitude);
        mover.applyForce(drag);
    }

    display() {
        this.p.noStroke();
        this.p.fill(175);
        this.p.rect(this.x, this.y, this.w, this.h);
    }
}
