let p1, p2
function setup() {
    createCanvas(600, 600)
    noLoop()
}

function draw() {
    p1 = random(cols1)
    p2 = random(cols2)
    background(0)
    strokeWeight(1)
    for (let i = 0; i <= width; i++) {
        let fracX = i / width
        stroke(lerpColor(color(p1[0]), color(p1[1]), fracX))
        if (random() < 0.5) line(i, 0, i, height)
        let fracY = i / height
        stroke(lerpColor(color(p2[0]), color(p2[1]), fracY))
        if (random() < 0.5) line(0, i, width, i)
    }
}

function randi(l, h) {
    return floor(random(l, h + 1))
}

const cols1 = [
    ["#26264A", "#D02B3B"],
    ["#BF2C2B", "#3A0D22"],
    ["#F59A2F", "#FFE055"],
    ["#7EBD61", "#FCBE0B"],
    ["#02789F", "#00A99C"],
    ["#E9B637", "#D31127"],
    ["#3A0D22", "#DADD39"],
    ["#61709C", "#B9CE2F"],
]
const cols2 = [
    ["#0A0A0A", "#FFEC0D"],
    ["#004ED8", "#ED0302"],
    ["#F49880", "#01BFBF"],
    ["#6C119C", "#FF9686"],
    ["#5A5A5A", "#CCED00"],
    ["#0A0A0A", "#FF9C00"],
    ["#008BDE", "#FF9C00"],
]
