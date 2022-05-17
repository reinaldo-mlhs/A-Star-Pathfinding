import Node from "./node.js";

export default class Grid {
    constructor(width, height, obstacles=[]) {

        this.width = width;
        this.height = height;

        this.nodes = function () {
            const nodes = [];
            for (var y = 0; y <= height - 1; y++) {
                for (var x = 0; x <= width - 1; x++) {
                    const isObstacle = obstacles.some(obs => obs[0] === x && obs[1] === y);
                    nodes.push(new Node(x, y, isObstacle));
                }
            }
            return nodes;
        }();

    }

    getNode(x, y) {
        return this.nodes[(x) + ((y) * this.width)];
    }

    makeNodeObstacle(x, y) {
        const currentNode = this.getNode(x, y);
        currentNode.obstacle = true;
    }

    makePath(x, y, startNode) {
        const currentNode = this.getNode(x, y);

        if (currentNode === startNode) {
            return;
        }
        else if (currentNode.parent === null) {
            console.log("current node parent is null");
            return;
        }
        else {
            currentNode.partOfPath = true;
            this.makePath(currentNode.parent.x, currentNode.parent.y, startNode);
        }
    }

    log() {
        console.log(this.nodes.filter(node => node.partOfPath))
    }
}