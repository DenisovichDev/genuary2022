const points = []
const colors = []
let step, palette, r
let t = 1

function setup() {
    createCanvas((w = 600), (h = 600))
    r = min(w, h) / 3
    palette = random(colorPals)
    for (i = 0; i < r * 0.75; i++) {
        let a = random(TAU)
        let r_ = r * sqrt(random(1))
        points[i] = createVector(r_ * cos(a) + w / 2, r_ * sin(a) + h / 2)
        colors[i] = random(palette)
    }
    background(19)
    step = randi(3, 10)
    console.log(points.length)
}

function draw() {
    for (let i = points.length - 1; i >= 0; i--) {
        let p = points[i]
        let n = (noise(p.x * 0.01, p.y * 0.01) * 8 * PI) % TAU
        n = round(n / (TAU / step)) * (TAU / step)

        let f = createVector(cos(n), sin(n))
        p.add(f)

        if (
            pow(p.x - w / 2, 2) + pow(p.y - h / 2, 2) <= pow(r, 2) &&
            frameCount % 4 === 0
        ) {
            let c = color(colors[i])
            c.setAlpha(map(dist(w / 2, h / 2, p.x, p.y), 0, r, 255, 100))
            stroke(c)
            strokeWeight(1)
            push()
            translate(p.x, p.y)
            rotate(f.heading())
            line(0, -10 / t, 0, 10 / t)
            pop()
        }
        if (random(1) < 0.02) {
            points.splice(i, 1)
            colors.splice(i, 1)
        }
    }
    t += 0.05
    console.log(points.length)
}

function randi(l, h) {
    return floor(random(l, h + 1))
}

const colorPals = [
    ["#f7f3f2", "#0077e1", "#f5d216", "#fc3503"],
    ["#294984", "#6ca0a7", "#ffc789", "#df5f50", "#5a3034", "#fff1dd"],
    ["#fef9c6","#ffcc4d","#f5b800","#56a1c4","#4464a1","#ee726b","#df5f50","#5a3034"],
    ["#ed6a5a", "#f4f1bb", "#9bc1bc", "#5d576b", "#e6ebe0"],
    ["#d9ed92","#b5e48c","#99d98c","#76c893","#52b69a","#34a0a4","#168aad","#1a759f","#1e6091","#184e77"]
]
