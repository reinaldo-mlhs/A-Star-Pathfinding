
import Grid from "./grid.js";
import { APath, APathStep } from "./pathfinder.js";
import PriorityQueue from "./queue.js";

const canvasWidth = 800;
const canvasHeight = 800;
const gridWidth = 40;
const gridHeight = gridWidth;
let mouseX = 0;
let mouseY = 0;

const rectIncrement = Math.round(canvasWidth / gridWidth);
console.log(rectIncrement);

let obstacles = [];
let grid = new Grid(gridWidth, gridHeight);
let queue = new PriorityQueue((a, b) => a[1] < b[1]);
let start = grid.getNode(0, 0);
let goalPosition = [gridWidth - 2, gridWidth - 2];
let end = grid.getNode(goalPosition[0], goalPosition[1]);
let startPathfinding = false;
//options
let fast = false;
let details = 1;


const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.height = canvasHeight;
canvas.width = canvasWidth;
var rect = canvas.getBoundingClientRect();

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

startRender(300);

function startRender(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    render();
}

function render() {

    if (stop) {
        return;
    }

    requestAnimationFrame(render);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        (startPathfinding && !fast) && APathStep(start, end, grid, queue);
        grid.nodes.forEach(node => {
            let obstacle = node.obstacle;
            let X = node.x * rectIncrement;
            let Y = node.y * rectIncrement;
            let W = X + rectIncrement;
            let H = Y + rectIncrement;
            let inside = (X < mouseX && W >= mouseX) && (Y < mouseY && H >= mouseY) ? true : false;

            let nodeColor = (inside || obstacle) ? "black" : 'white'; //obstacles and mouse

            if (details > 0) {
                nodeColor = node.visited ? "orange" : nodeColor;
            }

            nodeColor = node.partOfPath ? "blue" : nodeColor; //path color
            nodeColor = node === start || node === end ? "red" : nodeColor; //start and end node

            ctx.fillStyle = nodeColor;
            ctx.fillRect(X, Y, W, H);
            ctx.strokeRect(X, Y, W, H);

            if (details > 1) {
                if (node.parent && node.visited) {
                    ctx.fillStyle = "black";
                    ctx.font = "9px";
                    ctx.fillText(node.rootDistance, X, Y + 20);
                    ctx.fillText(node.goalDistance, X, Y + 30);
                    ctx.fillText(node.distance, X, Y + 40);
                }
            }

        })
    }
}

function getNodeAtMouse(mouseX, mouseY) {
    let X = Math.floor(mouseX / rectIncrement);
    let Y = Math.floor(mouseY / rectIncrement);
    const node = grid.getNode(X,Y);
    if (node) {
        return node;
    }
    return false;
}

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

canvas.addEventListener("mousedown", (event) => {
    let node = getNodeAtMouse(mouseX, mouseY);

    let operation = addObstacle;
    if (node === end) {
        operation = dragGoal;
    }

    operation();

    document.onmousemove = function (event) {
        node = getNodeAtMouse(mouseX, mouseY);
        operation();
        // console.log(mouseX, mouseY);
        // console.log(node.x, node.y);
    }

    function addObstacle() {
        if (node) {
            node.obstacle = true;
            obstacles.push([node.x, node.y]);
        }
    }

    function dragGoal() {
        if (node) {
            goalPosition = [node.x, node.y];
            end = grid.getNode(goalPosition[0], goalPosition[1]);
            startFastSearch();
        }
    }
});

document.addEventListener("mouseup", function (e) {
    document.onmousemove = null
});


document.getElementById("start-pathfinding").addEventListener("click", (event) => {
    startPathfinding = true;

    reset();

    start = grid.getNode(0, 0);
    end = grid.getNode(goalPosition[0], goalPosition[1]);
    start.visited = true;
    start.rootDistance = 0;

    queue.push([start, start.distance]);
    (startPathfinding && fast) && APath(start, end, grid, queue);
});

document.getElementById("reset-pathfinding").addEventListener("click", (event) => {
    startPathfinding = false;
    reset(true);
});

const fastCheckbox = document.getElementById("fast");
fastCheckbox.addEventListener("change", () => {
    if (fastCheckbox.checked) {
        fast = true;
    } else {
        fast = false;
    }
});

function reset(clearObstacles = false) {
    if (clearObstacles) {
        obstacles = [];
    }
    grid = new Grid(gridWidth, gridHeight, obstacles);
    queue = new PriorityQueue((a, b) => a[1] < b[1]);
}

function startFastSearch() {
    reset();

    start = grid.getNode(0, 0);
    end = grid.getNode(goalPosition[0], goalPosition[1]);
    start.visited = true;
    start.rootDistance = 0;

    queue.push([start, start.distance]);
    APath(start, end, grid, queue);
}
