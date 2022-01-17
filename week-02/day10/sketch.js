const points = []
const nodeDiam = 50
const cols = [
    "#D62829",
    "#cd2306",
    "#F67F00",
    "#002F49",
    "#144D64",
    "#712A2B",
    "#2E2C51",
]
let layers,
    margin = 50,
    bf,
    colOffX,
    colOffY,
    color

function setup() {
    createCanvas((w = 600), (h = 600))
    bf = createGraphics(w, h)
    noLoop()

    colOffX = random([-1, 1]) * random(7, 10)
    colOffY = random([-1, 1]) * random(7, 10)
    layers = randi(3, 5)
    margin = w / (layers * 2)
    color = random(shuffle(cols))
    let midSpace = (w - 2 * margin) / (layers - 1)

    for (let i = 0; i < layers; i++) {
        let nodeNum
        // selects the apt node numbers
        switch (i) {
            case 0:
                nodeNum = randi(2, 3)
                break
            case 1:
                nodeNum = randi(3, 5)
                break
            case layers - 1:
                nodeNum = randi(2, 3)
                break
            default:
                nodeNum = randi(3, points[i - 1].length)
                break
        }

        let x = margin + i * midSpace
        let vertSpace = nodeDiam / 2
        let yInit = w / 2 - ((nodeDiam + vertSpace) * (nodeNum - 1)) / 2
        let vectors = []
        for (let j = 0; j < nodeNum; j++) {
            let y = yInit + j * (nodeDiam + vertSpace)
            vectors.push(createVector(x, y))
        }
        points.push(vectors)
    }

    for (let i = 0; i < layers; i++) {
        for (let p of points[i]) {
            bf.fill(color)
            bf.noStroke()
            bf.circle(p.x, p.y, nodeDiam)
        }
    }
}

function draw() {
    background(230)
    gorillaGrain(13)
    image(bf, colOffX, colOffY)

    for (let i = 0; i < layers; i++) {
        for (let p of points[i]) {
            noFill()
            spottyCircle(p.x, p.y, nodeDiam / 2)

            // Drawing the network
            if (i === layers - 1) continue
            for (let q of points[i + 1]) {
                let theta = atan2(q.y - p.y, q.x - p.x)
                let phi = PI + theta
                let x1 = p.x + (nodeDiam / 2) * cos(theta)
                let y1 = p.y + (nodeDiam / 2) * sin(theta)
                let x2 = q.x + (nodeDiam / 2) * cos(phi)
                let y2 = q.y + (nodeDiam / 2) * sin(phi)
                yazidStyleLine(x1, y1, x2, y2)
            }
        }
    }
}

function spottyCircle(x, y, r) {
    let step = radians(width / random(500, 2000))
    let weight = 2
    let off = random(0.2, 0.5)
    for (let theta = 0; theta < TAU; theta += step) {
        let a = x + r * cos(theta) + random(-off, off)
        let b = y + r * sin(theta) + random(-off, off)
        let diam = random(width / 2000, width / 900) * weight

        noFill()
        circle(a, b, diam)
    }
}

function yazidStyleLine(x1, y1, x2, y2) {
    let theta = atan2(y2 - y1, x2 - x1)
    let d = dist(x1, y1, x2, y2)
    let step = width / random(1000, 2000)
    let weight = 1
    let off = random(0.2, 0.5)
    for (let i = 0; i < d; i += step) {
        let diam = random(width / 2000, width / 900) * weight
        noFill()
        circle(
            x1 + i * cos(theta) + random(-off, off),
            y1 + i * sin(theta) + random(-off, off),
            diam
        )
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

function randi(l, h) {
    return floor(random(l, h + 1))
}
