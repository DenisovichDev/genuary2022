let numberOfClusters
function setup() {
    createCanvas(600, 600)
    noLoop()
}

function draw() {
    background(0, 6, 15)
    drawRandomStars(600)
    numberOfClusters = randi(3, 4)
    for (let i = 0; i < numberOfClusters; i++) cluster(random(1000, 2000))

    drawGalaxy(3000)

    fill(113, 21, 21)
    rectMode(CENTER)
    rect(width / 2, height / 2, 50, 200)
    circle(width / 2, height / 2 - 200 / 2, 50)

    // Monoliths
    let scl = 0.5
    fill(25)
    rect(width / 4, height / 2, 50 * scl, 200 * scl)
    rect((width * 3) / 4, height / 2, 50 * scl, 200 * scl)
    rect(width / 8, height / 2, 50 * scl * scl, 200 * scl * scl)
    rect((width * 7) / 8, height / 2, 50 * scl * scl, 200 * scl * scl)
}

function drawRandomStars(numberOfStars) {
    for (let i = 0; i < numberOfStars; i++) {
        strokeWeight(floor(random(3)))
        stroke(255, random(100, 255))
        point(random(width), random(height))
    }
}

function drawGalaxy(numberOfStars) {
    let m = tan(random(-PI / 6, PI / 6))
    let c = random(width / 2, width)
    for (let i = 0; i < numberOfStars; i++) {
        strokeWeight(floor(random(3)))
        stroke(255, random(120))
        let x = random(width)
        let randOff = random(random(-200), random(200))
        point(x, m * x + c + randOff)
        fill(76, 57, 112, map(abs(randOff), 0, 300, 8, 0))
        noStroke()
        if (random(1) < 0.5) circle(x, m * x + c + randOff, random(20, 50))
    }
}

function cluster(numberOfStars) {
    blendMode(ADD)
    let cent = createVector(random(100, width - 100), random(100, height / 2))
    // let c = color() // 17, 81, 106
    for (let i = 0; i < numberOfStars; i++) {
        strokeWeight(floor(random(3)))
        stroke(255, random(120))
        let randXOff = random(-random(300), random(300))
        let randYOff = random(-random(300), random(300))
        point(cent.x + randXOff, cent.y + randYOff)
        let d = dist(cent.x + randXOff, cent.y + randYOff, cent.x, cent.y)
        fill(17, 81, 106, map(d, 0, 200, 10, 0))
        noStroke()
        if (random(1) < map(d, 0, 300, 1, 0.6))
            circle(cent.x + randXOff, cent.y + randYOff, random(20, 50))
    }
    blendMode(BLEND)
}

function randi(l, h) {
    return floor(random(l, h + 1))
}

function mouseClicked() {
    redraw()
}
