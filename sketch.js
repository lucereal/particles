p5.disableFriendlyErrors = true; // disables FES

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

var particles = [];
let mouse;
//acts like a constructor
function setup() {
    createCanvas(x, y);
    for (let i = 0; i < x / 25; i++) {
        p = new Particle(random(0, x), random(0, y));
        particles.push(p);
    }
}

function draw() {
    background(182, 25, 36)
    let fps = frameRate();
    fill(255);
    stroke(255);
    textSize(20);
    text("FPS: " + fps.toFixed(2), x/2,y/2);
    particles.forEach((p) => {
        p.show();
        p.update();
    })
}

class Particle {

    constructor(x, y) {
        this.alpha = 250
        this.valpha = 1
        this.r = 2
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(random(-2, 2), random(-2, 2))
        this.location = createVector(x, y);
        this.ogV = this.velocity;

    }
    show() {
        noStroke();
        fill(this.alpha)
        ellipse(this.location.x, this.location.y, 2 * this.r)
    }
    update() {

        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.velocity.limit(1)
        this.alpha = 250;
        this.nearMouse()
        this.checkEdgeCollision();
        this.intersects();


    }
    finished() {
        return this.alpha > 150 || this.alpha <= 0
    }
    intersects() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            if (!(p.location.x == this.location.x && p.location.y == this.location.y)) {
                if (dist(this.location.x, this.location.y, p.location.x, p.location.y) < ((this.r + p.r) * 30)) {
                    stroke(50);
                    line(this.location.x, this.location.y, p.location.x, p.location.y)
                    this.changeColor(0)
                    p.changeColor(0)

                }
                if (dist(this.location.x, this.location.y, p.x, p.y) <= ((this.r + p.r))) {
                    this.velocity.x *= -1;
                    this.velocity.y *= -1;
                }
            }

        }
    }
    nearMouse() {
        let mouser = 100
        let pushv = 3
        noFill()
        stroke(0)
        noStroke()
        ellipse(mouseX, mouseY, mouser * 2)

        if (dist(this.location.x, this.location.y, mouseX, mouseY) < (this.r + mouser)) {
            if (this.location.x < mouseX) {
                //this.velocity.x = -pushv;
                this.location.add(createVector(-pushv, this.velocity.y))
            }
            if (this.location.x > mouseX) {
                //this.velocity.x = pushv;
                this.location.add(createVector(pushv, this.velocity.y))
            }
            if (this.location.y > mouseY) {
                //this.velocity.y = pushv;
                this.location.add(createVector(this.velocity.x, pushv))
            }
            if (this.location.y < mouseY) {
                // this.velocity.y = -pushv;
                this.location.add(createVector(this.velocity.x, -pushv))
            }
        }
    }
    checkEdgeCollision() {
        if (this.location.x >= x || this.location.x <= 0) {
            this.velocity.x *= random(-2, -1);
        }
        if (this.location.y >= y || this.location.y <= 0) {
            this.velocity.y *= random(-2, -1);
        }
    }
    changeColor(color) {
        this.alpha = color
    }
}
