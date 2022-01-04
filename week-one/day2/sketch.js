const screenAngles = [
    [15, 75, 0, 45],
    [105, 75, 90, 15],
    [15, 45, 0, 75],
    [165, 45, 90, 105],
]
const colors = ["#00ffff", "#ff00ff", "#ffff00", "#000000"]

let unitGrid = 10
let maxDiam = unitGrid * 0.9
let rows, cols
let rotations
let xOff, yOff
let zOff = 0
let randomPhases = []

let record = false
let counter = 0

function setup() {
    createCanvas(400, 400)
    // noLoop()
    noStroke()
    // frameRate(20)

    angleMode(DEGREES)

    rows = floor(width / unitGrid)
    cols = floor(height / unitGrid)
    rotations = random(screenAngles)
    for (let i = 0; i < 4; i++) randomPhases.push(random(100000))
}

function draw() {
    blendMode(BLEND)
    background(255)
    blendMode(MULTIPLY)

    for (let m = 0; m < 4; m++) {
        // loops through colors. Change m < 4 to get k

        push()
        fill(colors[m])
        translate(width / 2, height / 2)
        rotate(-rotations[m])
        translate(-width / 2, -height / 2)
        let phase = randomPhases[m]
        yOff = 0
        for (let j = -rows / 2; j < rows + rows / 2; j++) {
            xOff = 0
            for (let i = -cols / 2; i < cols + cols / 2; i++) {
                let d =
                    noise(phase + xOff, phase + yOff, phase + zOff) * maxDiam
                if (m === 3) d *= 0.6
                push()
                translate(i * unitGrid, j * unitGrid)
                circle(unitGrid / 2, unitGrid / 2, d)

                pop()

                xOff += 0.1
            }
            yOff += 0.1
        }
        pop()
    }

    counter < 30 ? (zOff += 0.1) : (zOff -= 0.1)

    if (record && frameCount <= 60 && frameCount % 1 === 0) {
        saveCanvas("out-" + counter, "png")
        counter++
    }
}

function gorillaGrain(gA) {
    loadPixels()
    let d = pixelDensity()
    let halfImage = 4 * (width * d) * (height * d)
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA)
        pixels[i] = pixels[i] + gA / 2
        pixels[i + 1] = pixels[i + 1] + grainAmount
        pixels[i + 2] = pixels[i + 2] + grainAmount
        pixels[i + 3] = pixels[i + 3] + grainAmount
    }
    updatePixels()
}
