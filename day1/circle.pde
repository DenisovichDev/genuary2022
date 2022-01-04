class Circle {
  
  PVector pos;
  PVector vel;
  //PVector acc;
  float d;
  float rate;
  float maxRad;
  //float maxSpeed;
  float lifetime;
  boolean alive;

  Circle(PVector initPos) {
    pos = initPos;
    d = 100;
    rate = random(1, 4);
    vel = PVector.random2D();
    //acc = PVector.random2D();
    maxRad = random(10, 50);
    //maxSpeed = random(2, 3);
    
    float a = random(1);
    if (a < 0.2) lifetime = floor(random(100, 200));
    if (a < 0.95 && a >= 0.2) lifetime = floor(random(200, 500));
    if (a >= 0.95) lifetime = floor(random(500, 900));

    alive = true;
  }

  void show() {
    push();
    noFill();
    stroke(255, 100);
    strokeWeight(1);
    circle(pos.x, pos.y, d);
    //point(pos.x, pos.y);
    pop();
  }

  void update() {
    if (lifetime > 0) {
      //acc = PVector.random2D();
      edges();
      move();
      increase();
      live();
    } else {
      alive = false;
    }
  }

  void move() {
    pos.add(vel);
    //vel.limit(maxSpeed);
    //vel.add(acc);
    //acc.mult(0);
  }

  void live() {
    lifetime--;
  }

  void increase() {
    if (d/2 < maxRad) d += rate;
  }

  void edges() {
    if (pos.x > width) {
      pos.x = 0;
    }
    if (pos.x < 0) {
      pos.x = width;
    }
    if (pos.y > height) {
      pos.y = 0;
    }
    if (pos.y < 0) {
      pos.y = height;
    }
  }
}
