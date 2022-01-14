import p5 from "p5";

export class Mover {
    static G = 6.67428e-11;
    position: p5.Vector = null;
    velocity: p5.Vector = null;
    acceleration: p5.Vector;
    radius: number = 0;
    constructor(private p: p5, x: number, y: number, public mass: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
        this.radius = this.mass * 4;
    }

    applyForce(force: p5.Vector) {
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    applyAcceleration(a: p5.Vector) {
        this.acceleration.add(a);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.bounceEdges();
    }

    attract(m: Mover) {
        const force = p5.Vector.sub(this.position, m.position);
        let distance = force.mag();
        distance = this.p.constrain(distance, 5, 25);
        const strength =
            ((Mover.G * this.mass * m.mass) / (distance * distance)) * 1e8;
        force.setMag(strength);
        return force;
    }

    display() {
        this.p.stroke(0);
        this.p.fill(100);
        this.p.ellipse(
            this.position.x,
            this.position.y,
            this.radius * 2,
            this.radius * 2
        );
    }

    concactEdge() {
        return this.position.y > this.p.height - this.radius - 1;
    }

    bounceEdges() {
        let bounce = -0.9;
        if (this.position.x > this.p.width - this.radius) {
            this.velocity.x *= bounce;
            this.position.x = this.p.width - this.radius;
        } else if (this.position.x < this.radius) {
            this.velocity.x *= bounce;
            this.position.x = this.radius;
        }
        if (this.position.y > this.p.height - this.radius - 1) {
            this.velocity.y *= bounce;
            this.position.y = this.p.height - this.radius - 1;
        } else if (this.position.y < this.radius) {
            this.velocity.y *= bounce;
            this.position.y = this.radius;
        }
    }
}
