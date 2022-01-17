import P5 from "p5";

function sketch() {
    return {};
}

const p = new P5(sketch, document.body);
p.preload = function () {
    console.log(this);
};

p.setup = function () {
    p.createCanvas(640, 360);
};

p.draw = function () {};
