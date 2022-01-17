let c1, c2
const N = 500000
let N2 = N / 4
const points = []
const secPoints = []
function setup() {
    createCanvas((w = 600), (h = 600))
    c1 = color("#FDE0D9")
    c2 = color("#2E2C51")

    noLoop()
    strokeWeight(1)

    for (let i = 0; i < N; i++) {
        let notPushed = true
        while (notPushed) {
            let pos = createVector(random(0, width), random(0, height))
            let d = dist(pos.x, pos.y, width / 2, pos.y) // distance from x = w / 2

            let prob = map(
                d,
                map(pos.y, h / 2, h, 50, 20),
                random(w / 10, w / 2),
                1,
                0
            )

            if (random(1) < prob) {
                points.push(pos)
                notPushed = false
            }
        }
    }

    for (let i = 0; i < N2; i++) {
        let notPushed = true
        while (notPushed) {
            let pos = createVector(random(0, width), random(0, height / 2))
            let d = dist(pos.x, pos.y, pos.x, 0) // dist from y = 0

            let prob = map(d, 50, random(h / 6, h / 2), 1, 0)

            if (random(1) < prob) {
                points.push(pos)
                notPushed = false
            }
        }
    }
}

function draw() {
    background(c2)

    for (let p of points) {
        let d = dist(p.x, p.y, width / 2, p.y)
        let a = map(d, w / 10, w / 2, 100, 0)

        c1.setAlpha(a)
        stroke(c1)
        point(p.x, p.y)
        /*
        fill(253, 224, 217, map(d, 0, 300, 5, 0))
        noStroke()
        if (random(1) < map(d, 0, 300, 0.01, 0)) {
            blendMode(ADD)
            circle(p.x, p.y, random(20, 50))
            blendMode(BLEND)
        }
        */
    }

    for (let p of secPoints) {
        let d = dist(p.x, p.y, width / 2, p.y)
        let a = map(d, 0, w / 2, 100, 0)

        c1.setAlpha(a)
        stroke(c1)
        point(p.x, p.y)
    }

    for (let i = 0; i < 1000; i++) {
        let y = random(h)
        let randOff = random(map(y, 0, h, 300, 50))
        let pos = createVector(w / 2 + random(-randOff, randOff), y)
        let d = dist(pos.x, pos.y, width / 2, pos.y)

        fill(253, 224, 217, map(d, 0, 100, 5, 0))
        noStroke()

        blendMode(ADD)
        circle(pos.x, pos.y, random(20, 50))
        blendMode(BLEND)
    }
}
