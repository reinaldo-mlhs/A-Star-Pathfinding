
export default class Node {
    constructor(x, y, obstacle = false) {
        this.x = x
        this.y = y

        this.rootDistance = 99999;
        this.goalDistance = 99999;
        this.distance = 999999;

        this.visited = false;
        this.parent = null;
        this.distanceFromParent = 1;
        this.partOfPath = false;
        this.obstacle = obstacle;

    }

    log() {
        console.log(this.x, this.y, this.partOfPath);
    }

    getPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getUnvisitedNeighbors(grid, diagonals = true) {

        const neighbors = [];
        const edge = 0;

        const topNode = this.y - 1 < edge ? null : grid.getNode(this.x, this.y - 1);
        topNode && !topNode.obstacle && neighbors.push(topNode);
        if (topNode) {
            topNode.distanceFromParent = 1.0;
        }

        const rightNode = this.x + 1 > grid.width ? null : grid.getNode(this.x + 1, this.y);
        rightNode && !rightNode.obstacle && neighbors.push(rightNode);
        if (rightNode) {
            rightNode.distanceFromParent = 1.0;
        }

        const bottomNode = this.y + 1 > grid.height ? null : grid.getNode(this.x, this.y + 1);
        bottomNode && !bottomNode.obstacle && neighbors.push(bottomNode);
        if (bottomNode) {
            bottomNode.distanceFromParent = 1.0;
        }

        const leftNode = this.x - 1 < edge ? null : grid.getNode(this.x - 1, this.y);
        leftNode && !leftNode.obstacle && neighbors.push(leftNode);
        if (leftNode) {
            leftNode.distanceFromParent = 1.0;
        }

        if (diagonals) {
            const topRightNode = this.y - 1 < edge || this.x + 1 > grid.width ? null : grid.getNode(this.x + 1, this.y - 1);
            topRightNode && !topRightNode.obstacle && neighbors.push(topRightNode);
            if (topRightNode) {
                topRightNode.distanceFromParent = 1.4;
            }

            const bottomRightNode = this.y + 1 > grid.height || this.x + 1 > grid.width ? null : grid.getNode(this.x + 1, this.y + 1);
            bottomRightNode && !bottomRightNode.obstacle && neighbors.push(bottomRightNode);
            if (bottomRightNode) {
                bottomRightNode.distanceFromParent = 1.4;
            }

            const bottomLeftNode = this.y + 1 > grid.height || this.x - 1 < edge ? null : grid.getNode(this.x - 1, this.y + 1);
            bottomLeftNode && !bottomLeftNode.obstacle && neighbors.push(bottomLeftNode);
            if (bottomLeftNode) {
                bottomLeftNode.distanceFromParent = 1.4;
            }

            const topLeftNode = this.y - 1 < edge || this.x - 1 < edge ? null : grid.getNode(this.x - 1, this.y - 1);
            topLeftNode && !topLeftNode.obstacle && neighbors.push(topLeftNode);
            if (topLeftNode) {
                topLeftNode.distanceFromParent = 1.4;
            }
        }

        return neighbors;
    }
}