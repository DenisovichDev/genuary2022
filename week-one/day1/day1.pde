//Recording
int totalFrames = 600;
int counter = 0;
boolean record = false;
boolean slowMo = false;
//---------------------

ArrayList<Circle> circles;
ArrayList<PVector> walkers;
float xOff = 0;
float yOff = 0;
float xColorOff = 0;
int bezierOffset;
int frameGap = 4;
boolean isCurve = false;
PVector walker;
float walkerOff = 0;
int lineCntr = 0;
int numWalker = 10;
int lineLim = numWalker * 10000;

void setup() {
  size(600, 600);
  background(10);
  circles = new ArrayList<Circle>();
  walkers = new ArrayList<PVector>();

  //int off = 100;

  //for (int i = 0; i < 500; i++) {
  //  float num1 = random(0, width) - random(-off, off);
  //  float num2 = random(0, height) - random(-off, off);
  //  PVector initPos = new PVector(num1, num2); 
  //  circles.add(new Circle(initPos));
  //}

  for (int i = 0; i < numWalker; i++) {
    walkers.add(new PVector(random(width), random(height), floor(random(0, 100000)))); // z in the phase
  }
  bezierOffset = floor(random(20, 30));

  //if (random(0, 1) < 0.5) isCurve = true;
}

void draw() {
  background(10);

  fill(255);
  stroke(255);

  for (int i = 0; i < walkers.size(); i++) {
    walker = walkers.get(i);
    walker.x = (noise(walkerOff + walker.z) * width * 2) % width;  // spreading out the noise
    walker.y = (noise(walkerOff + walker.z + 10000) * height * 2) % height;
    if (random(1) < 0.2 && lineCntr <= lineLim) {
      PVector initPos = new PVector(walker.x, walker.y);
      circles.add(new Circle(initPos));
    }
  }
  walkerOff += 0.01;

  for (int i = circles.size() - 1; i >= 0; i--) {
    xOff = 0;
    yOff = 0;
    xColorOff = 0;

    Circle primary = circles.get(i);
    //primary.show();
    primary.update();
    if (!primary.alive) {
      circles.remove(primary);
      continue;
    }
    for (int j = i - 1; j >= 0; j--) {
      Circle secondary = circles.get(j);

      if (intercepts(primary, secondary)) {

        int r = floor(map(noise(xColorOff), 0, 1, 0, 255));
        int g = floor(map(noise(xColorOff + 1000), 0, 1, 0, 255));
        int b = floor(map(noise(xColorOff + 4000), 0, 1, 0, 255));

        //fill(r, g, b, 150);

        //beginShape();
        //stroke(255, 2);

        noFill();

        //vertex(primary.pos.x, primary.pos.y);
        PVector p2 = PVector.lerp(primary.pos, secondary.pos, 0.33333);
        PVector p2Off = new PVector(map(noise(xOff), 0, 1, -bezierOffset, bezierOffset), map(noise(yOff), 0, 1, -bezierOffset, bezierOffset)); 

        PVector p3 = PVector.lerp(primary.pos, secondary.pos, 0.66666);
        PVector p3Off = new PVector(map(noise(xOff + 100000), 0, 1, -bezierOffset, bezierOffset), map(noise(yOff + 100000), 0, 1, bezierOffset, -bezierOffset));
        //quadraticVertex(p2.x + p2Off.x, p2.y + p2Off.y, secondary.pos.x, secondary.pos.y);
        //endShape();
        float w = map(primary.pos.dist(secondary.pos), 0, primary.d /2 + secondary.d / 2, 0, 5);
        float a = map(primary.pos.dist(secondary.pos), 0, primary.d /2 + secondary.d / 2, 255, 0);
        strokeWeight(w);
        stroke(r, g, b, a);

        
          if (isCurve) bezier(primary.pos.x, primary.pos.y, p2.x + p2Off.x, p2.y + p2Off.y, p3.x + p3Off.x, p3.y + p3Off.y, secondary.pos.x, secondary.pos.y);
          else line(primary.pos.x, primary.pos.y, secondary.pos.x, secondary.pos.y);
          lineCntr++;
        
      }
      xColorOff += 0.1;
      xOff += 0.01;
      yOff += 0.01;
    }
  }


  // Recording
  if (record && frameCount % 2 == 0) {
    //if (slowMo) {
    saveFrame("gif/gif-"+nf(counter, 3)+".png");
    counter++;
    println(counter);
    //if (counter == totalFrames-1) {
    //  exit();
    //}
  }
  //--------------
}

boolean intercepts(Circle c1, Circle c2) {      // Returns true if two Circles intercepts
  float distance = distanceBetween(c1.pos, c2.pos);
  if ((c1.d/2 + c2.d/2) > distance) {
    return true;
  } 
  return false;
}

float distanceBetween(PVector v1, PVector v2) {
  float delX = v1.x - v2.x;
  float delY = v1.y - v2.y;

  return (sqrt(pow(delX, 2) + pow(delY, 2)));
}

void disposeTheDead(Circle circle) {
  if (!circle.alive) {
    circles.remove(circle);
  }
}

void keyPressed() {
  
  //saveFrame("captures/capture-"+int(random(0, 1000))+".png");
  
  record = false;
}

//void mousePressed() {
//  record = true;
//}

void mouseDragged() {
  if (random(1) < 0.2) {
    PVector initPos = new PVector(mouseX, mouseY); 
    circles.add(new Circle(initPos));
  }
}
