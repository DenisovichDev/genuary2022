let cent1, cent2
let theta, phi, thetaIncrement, phiIncrement
let ls
let c1px, c2py
let hist = []
let speed = 1000
let initH, step

function setup() {
    createCanvas(600, 600)
    cent1 = { x: 300, y: 600, r: 100 } // x, y, r
    cent2 = { x: 600, y: 300, r: 70 } // x, y, r

    theta = 0
    phi = 0

    thetaIncrement = random(0.02, 0.03)
    phiIncrement = random(0.01, 0.02)

    step = random(0.5, 1)
    colorMode(HSB, 100)
}

function draw() {
    background(0, 0, 100)
    cent1.r = sin(millis() / speed) * 20 + 200
    cent2.r = sin(PI / 3 + millis() / speed) * 20 + 200

    let c1x = cent1.x + cent1.r * cos(theta)
    let c2y = cent2.y + cent2.r * sin(phi)

    strokeWeight(20)
    initH = 0
    let previous = hist[0]
    for (let i = 1; i < hist.length; i++) {
        const current = hist[i]
        stroke(initH % 100, 100, 100)
        initH += 1

        line(previous.x, previous.y, current.x, current.y)
        previous = current
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
