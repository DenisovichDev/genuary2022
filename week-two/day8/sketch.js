let cent1, cent2
let theta, phi, thetaIncrement, phiIncrement
let ls
let c1px, c2py
let hist = []
let speed = 1000

function setup() {
    createCanvas(600, 600)
    cent1 = { x: 300, y: 600, r: 100 } // x, y, r
    cent2 = { x: 600, y: 300, r: 70 } // x, y, r

    theta = 0
    phi = 0

    thetaIncrement = random(0.02, 0.03)
    phiIncrement = random(0.01, 0.02)

    stroke("#fff")
    strokeWeight(3)
}

function draw() {
    background("#000")
    cent1.r = sin(millis() / speed) * 20 + 200
    cent2.r = sin(PI / 3 + millis() / speed) * 20 + 200

    let c1x = cent1.x + cent1.r * cos(theta)
    // let c1y = cent1.y + cent1.r * sin(theta)
    // let c2x = cent2.x + cent2.r * cos(phi)
    let c2y = cent2.y + cent2.r * sin(phi)

    /*
    point(c1x, c1y)
    point(c2x, c2y)
    drawCircle(cent1.x, cent1.y, cent1.r)
    drawCircle(cent2.x, cent2.y, cent2.r)

    stroke(255, 0, 0, 100)
    line(c1x, c1y, c1x, c2y)
    line(c2x, c2y, c1x, c2y)
    */

    stroke(255, 0, 0)
    strokeWeight(10)

    let prev = hist[0]
    for (let i = 1; i < hist.length; i++) {
        const cur = hist[i]
        line(prev.x, prev.y, cur.x, cur.y)
        prev = cur
    }

    hist.push({ x: c1x, y: c2y })
    if (hist.length > 200) {
        hist.shift()
    }

    theta += thetaIncrement
    phi += phiIncrement

    if (theta >= TAU) theta -= TAU
    if (phi >= TAU) theta -= TAU
}

function drawCircle(x, y, r) {
    push()
    noFill()
    strokeWeight(1)
    stroke(255, 200)
    circle(x, y, 2 * r)
    pop()
}
