// By Roni Kaufman
// https://ronikaufman.github.io
// https://twitter.com/KaufmanRoni
const colors = ["#0a0a0a", "#0077e1", "#f5d216", "#fc3503"]
let w = 450
let n = 20,
    s = w / n,
    margin = 2 * s,
    d = (s * 3) / 4
const N_FRAMES = 100
let tilts = [],
    levels = []

function setup() {
    createCanvas(n * s + 2 * margin, n * s + 2 * margin)
    strokeWeight(2)

    for (let i = 0; i < n; i++) {
        let x = margin + (i + 1 / 2) * s
        let levelLine = []
        let tiltLine = []
        for (let j = 0; j < n; j++) {
            let y = margin + (j + 1 / 2) * s
            levelLine.push(atan2(y - height / 2, x - width / 2) / 2)
            tiltLine.push(atan2(y - height / 2, x - width / 2) + PI)
        }
        levels.push(levelLine)
        tilts.push(tiltLine)
    }
}

function draw() {
    background("#f7f3f2")
    background(255)
    let t = (TAU * (frameCount % N_FRAMES)) / N_FRAMES + 100
    render(t)
}

function render(t) {
    for (let i = 0; i < n; i++) {
        let x = margin + (i + 1 / 2) * s
        for (let j = 0; j < n; j++) {
            let y = margin + (j + 1 / 2) * s
            let theta = abs(t - levels[i][j]) % TAU
            if (theta < PI) theta = PI - theta
            if (
                pow(x - width / 2, 2) + pow(y - height / 2, 2) >
                pow((n * s) / 2, 2)
            )
                continue
            noStroke()
            let angle = atan2(y - height / 2, x - width / 2) + (PI * 3) / 4
            let c = round(angle / (TAU / colors.length))

            fill(colors[c])
            arc(x, y, d, d, tilts[i][j] - theta, tilts[i][j] + theta, CHORD)

            stroke(0)
            strokeWeight(1)
            noFill()
            circle(x, y, d)
        }
    }
}
