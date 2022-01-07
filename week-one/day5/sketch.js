// Based on Hypertransformation of 20 Concentric Squares 1974 by Vera Molnar

let corners = []
let offsets = []
let normOffsets = []
let currentCoords = []

let triggered = false
let frac = 0

function setup() {
    createCanvas(600, 600)

    for (let i = 0; i < 20; i++) {
        let halfUnit = (i + 1) * 10

        let v1 = createVector(halfUnit, -halfUnit) // A
        let v2 = createVector(halfUnit, halfUnit) // B
        let v3 = createVector(-halfUnit, halfUnit) // C
        let v4 = createVector(-halfUnit, -halfUnit) // D

        corners.push([v1, v2, v3, v4])
    }

    offsetInit()
    copyNormalisedCoords()

    copyToCurrentCoords(normOffsets)

    noFill()
    // noLoop()
    stroke(0, 200)
}

function draw() {
    background("#DFDEDC")

    translate(width / 2, height / 2)
    // rectMode(CENTER)
    for (let n = 0; n < 20; n++) {
        beginShape()

        for (let i = 0; i < 4; i++) {
            vertex(corners[n][i].x, corners[n][i].y)
            for (let j = 0; j < 4; j++) {
                let coord
                if (triggered) {
                    coord = p5.Vector.lerp(
                        currentCoords[n][i * 4 + j],
                        offsets[n][i * 4 + j],
                        frac
                    )
                } else {
                    coord = currentCoords[n][i * 4 + j].copy()
                }
                vertex(coord.x, coord.y)
            }
        }

        endShape(CLOSE)
    }
    if (triggered) {
        frac += 0.01
        if (frac >= 1) {
            copyToCurrentCoords(offsets)
            offsetInit()
            frac = 0
        }
    }
}

function offsetInit() {
    offsets = []
    let probOfNotWonking
    let randomOff = 10

    for (let i = 0; i < 20; i++) {
        let halfUnit = (i + 1) * 10
        probOfNotWonking = i === 0 ? 1 : map(i, 0, 19, 0.5, 0.6)

        offsets[i] = []
        // AB

        offsets[i].push(
            createVector(
                halfUnit + random(-randomOff, randomOff),
                random(-halfUnit, -halfUnit / 2)
            )
        )
        offsets[i].push(
            createVector(
                halfUnit + random(-randomOff, randomOff),
                random(-halfUnit / 2, 0)
            )
        )
        offsets[i].push(
            createVector(
                halfUnit + random(-randomOff, randomOff),
                random(0, halfUnit / 2)
            )
        )
        offsets[i].push(
            createVector(
                halfUnit + random(-randomOff, randomOff),
                random(halfUnit / 2, halfUnit)
            )
        )

        // BC

        offsets[i].push(
            createVector(
                random(halfUnit, halfUnit / 2),
                halfUnit + random(-randomOff, randomOff)
            )
        )
        offsets[i].push(
            createVector(
                random(halfUnit / 2, 0),
                halfUnit + random(-randomOff, randomOff)
            )
        )
        offsets[i].push(
            createVector(
                random(0, -halfUnit / 2),
                halfUnit + random(-randomOff, randomOff)
            )
        )
        offsets[i].push(
            createVector(
                random(-halfUnit / 2, -halfUnit),
                halfUnit + random(-randomOff, randomOff)
            )
        )

        // CD
        offsets[i].push(
            createVector(
                -halfUnit + random(-randomOff, randomOff),
                random(halfUnit, halfUnit / 2)
            )
        )
        offsets[i].push(
            createVector(
                -halfUnit + random(-randomOff, randomOff),
                random(halfUnit / 2, 0)
            )
        )
        offsets[i].push(
            createVector(
                -halfUnit + random(-randomOff, randomOff),
                random(0, -halfUnit / 2)
            )
        )
        offsets[i].push(
            createVector(
                -halfUnit + random(-randomOff, randomOff),
                random(-halfUnit / 2, -halfUnit)
            )
        )

        // DA

        offsets[i].push(
            createVector(
                random(-halfUnit, -halfUnit / 2),
                -halfUnit + random(-randomOff, randomOff)
            )
        )
        offsets[i].push(
            createVector(
                random(-halfUnit / 2, 0),
                -halfUnit + random(-randomOff, randomOff)
            )
        )
        offsets[i].push(
            createVector(
                random(0, halfUnit / 2),
                -halfUnit + random(-randomOff, randomOff)
            )
        )
        offsets[i].push(
            createVector(
                random(halfUnit / 2, halfUnit),
                -halfUnit + random(-randomOff, randomOff)
            )
        )

        for (let j = 0; j < 4; j++) {
            if (random(1) < probOfNotWonking) offsets[i][j].x = halfUnit
            if (random(1) < probOfNotWonking) offsets[i][4 + j].y = halfUnit
            if (random(1) < probOfNotWonking) offsets[i][8 + j].x = -halfUnit
            if (random(1) < probOfNotWonking) offsets[i][12 + j].y = -halfUnit
        }
    }
}

function copyNormalisedCoords() {
    for (let i = 0; i < 20; i++) {
        let halfUnit = (i + 1) * 10
        normOffsets[i] = []

        for (let k = 0; k < 16; k++) {
            normOffsets[i].push(offsets[i][k].copy())
            // Copying the array won't work with slich() or Array.from()
            // or the other 10,000 ways. The vectors are itself referenced
            // so it needs to be copied individually
        }

        for (let j = 0; j < 4; j++) {
            normOffsets[i][j].x = halfUnit
            normOffsets[i][4 + j].y = halfUnit
            normOffsets[i][8 + j].x = -halfUnit
            normOffsets[i][12 + j].y = -halfUnit
        }
    }
}

function mouseClicked() {
    triggered = true
}

function copyToCurrentCoords(arr) {
    for (let i = 0; i < 20; i++) {
        currentCoords[i] = []
        for (let k = 0; k < 16; k++) {
            currentCoords[i].push(arr[i][k].copy())
        }
    }
}
