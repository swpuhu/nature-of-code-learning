import p5 from "p5";

export class Oscillator {
    public angle: p5.Vector;ƒ
    public velocity: p5.Vector;
    public amplitude: p5.Vector
    constructor(
        public p: p5,
    ) {
        this.angle = p.createVector();
        this.velocity = p.createVector(
            p.random(-0.05, 0.05),
            p.random(-0.05, 0.05)
        );
        this.amplitude = p.createVector(
            p.random(p.width / 2),
            p.random(p.height / 2)
        );
    }

    oscillate() {
        this.angle.add(this.velocity);
    }

    display() {
        const x = this.p.sin(this.angle.x) * this.amplitude.x;
        const y = this.p.sin(this.angle.y) * this.amplitude.y;

        this.p.push();
        this.p.translate(this.p.width / 2, this.p.height / 2);
        this.p.stroke(0);
        this.p.fill(175);

        this.p.line(0, 0, x, y);
        this.p.circle(x, y, 16);

        this.p.pop();
    }
}
