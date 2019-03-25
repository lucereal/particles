var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var particles = [];

//acts like a constructor
function setup() { 
    createCanvas(x, y);
    for(let i = 0; i< 125; i++){
        p = new Particle(random(0,x), random(0,y));
        particles.push(p);
    }
   
  } 
  
  function draw() { 
    background(225);
    particles.forEach((p) => {
        p.show();
        p.update();
     
    })
    // for(let i = 0; i<particles.length; i++){
    //     if(particles[i].finished()){
    //         particles[i].valpha = -1 * particles[i].valpha;
    //     }
    // }
   
}


class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.vx = random(-1,1);
        this.vy = random(-1,1)
        this.alpha = 250
        this.valpha = 1 //random(-1,1);
        this.r = 2.5
    }
    show(){
        noStroke();
        fill(this.alpha)
        ellipse(this.x,this.y, 2*this.r)
    }
    update(){
        this.x += this.vx
        this.y += this.vy
        //this.alpha += this.valpha;
        this.alpha = 250;
        this.checkEdgeCollision();
        this.intersects();
     
    }
    finished(){
        return this.alpha > 150 || this.alpha <= 0
    }
    intersects(){
        for(let i = 0; i< particles.length; i++){
            let p = particles[i];
             if(!(p.x == this.x && p.y == this.y)){
                if(dist(this.x,this.y,p.x,p.y) < ((this.r + p.r) * 10)){          
                    stroke(0);
                    line(this.x,this.y,p.x,p.y)
                    this.changeColor(0)
                    p.changeColor(0)
                    
                }
                if(dist(this.x,this.y,p.x,p.y) < ((this.r + p.r))){
                     this.vx*= -1;
                     this.vy*= -1;
                    
                }
             }
          
        }
    }
    checkEdgeCollision(){
        if(this.x >= x || this.x <= 0){
            this.vx *= -1;
        }
        if(this.y >= y || this.y <= 0){
            this.vy *= -1;
        }
    }
    changeColor(color){
        this.alpha = color
    }
}
