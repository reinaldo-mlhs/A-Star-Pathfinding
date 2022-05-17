
export function APath(start, end, grid, queue) {

    while (!queue.isEmpty()) {

        const currentNode = queue.pop()[0];

        let neighbors = currentNode.getUnvisitedNeighbors(grid, false);

        for (var i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            neighbor.visited = true;

            if (neighbor === end) {
                console.log("goal reached");
                queue.empty();
                grid.makePath(currentNode.x, currentNode.y, start);
                break;
            }
            else {
                const tempRootDistance = currentNode.rootDistance + neighbor.distanceFromParent;
                
                if (tempRootDistance < neighbor.rootDistance) {
                    neighbor.parent = currentNode;
                    neighbor.rootDistance = tempRootDistance;
                    neighbor.goalDistance = Math.abs(end.x - neighbor.x) + Math.abs(end.y - neighbor.y);
                    neighbor.distance = tempRootDistance + neighbor.goalDistance;

                    if (!queue.insideQueue(neighbor)) {
                        queue.push([neighbor, neighbor.distance]);
                    }
                    // else {
                    //     queue.changePriority(neighbor, neighbor.distance);
                    // }
                }
            }
        };

    }
}

export function APathStep(start, end, grid, queue) {

    if (!queue.isEmpty()) {

        const currentNode = queue.pop()[0];

        let neighbors = currentNode.getUnvisitedNeighbors(grid);

        for (var i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            neighbor.visited = true;

            if (neighbor === end) {
                console.log("goal reached");
                queue.empty();
                grid.makePath(currentNode.x, currentNode.y, start);
                break;
            }
            else {
                const tempRootDistance = currentNode.rootDistance + neighbor.distanceFromParent;
                
                if (tempRootDistance < neighbor.rootDistance) {
                    neighbor.parent = currentNode;
                    neighbor.rootDistance = tempRootDistance;
                    neighbor.goalDistance = Math.abs(end.x - neighbor.x) + Math.abs(end.y - neighbor.y);
                    neighbor.distance = tempRootDistance + neighbor.goalDistance;

                    if (!queue.insideQueue(neighbor)) {
                        queue.push([neighbor, neighbor.distance]);
                    }
                }
            }
        };

    }
}