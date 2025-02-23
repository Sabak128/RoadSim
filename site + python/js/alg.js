// Функция для поиска соседей клетки
function getNeighbors(x, y) {
    const neighbors = [];
    if (x > 0) neighbors.push([x - 1, y]); // Сосед слева
    if (x < gridWidth - 1) neighbors.push([x + 1, y]); // Сосед справа
    if (y > 0) neighbors.push([x, y - 1]); // Сосед сверху
    if (y < gridHeight - 1) neighbors.push([x, y + 1]); // Сосед снизу
    return neighbors;
}

// Функция для получения веса клетки
function getWeight(x, y) {
    const cellType = grid[x][y];
    if (cellType === "city") return 1;
    if (cellType === "mountain") return 3;
    if (cellType === "swamp") return 2;
    return 1; // Для пустых клеток
}

// Алгоритм Дейкстры для поиска кратчайшего пути
async function findShortestPath(start, end) {
    if (!start || !end) {
        console.error("Start or end point is undefined:", start, end);
        throw new Error("Start or end point is undefined");
    }

    const [startX, startY] = start.split(",").map(Number);
    const [endX, endY] = end.split(",").map(Number);

    // Проверка на корректность координат
    if (isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY)) {
        throw new Error("Invalid start or end coordinates");
    }

    const distances = Array.from({ length: gridWidth }, () => Array(gridHeight).fill(Infinity));
    const predecessors = Array.from({ length: gridWidth }, () => Array(gridHeight).fill(null));
    const priorityQueue = [[0, startX, startY]];

    distances[startX][startY] = 0;

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a[0] - b[0]); // Сортируем по стоимости
        const [currentDist, x, y] = priorityQueue.shift();

        if (x === endX && y === endY) break;

        const neighbors = getNeighbors(x, y);
        for (let [nx, ny] of neighbors) {
            const weight = getWeight(nx, ny);
            const newDist = currentDist + weight;

            if (newDist < distances[nx][ny]) {
                distances[nx][ny] = newDist;
                predecessors[nx][ny] = [x, y];
                priorityQueue.push([newDist, nx, ny]);
            }
        }
    }

    // Восстановление пути
    const path = [];
    let current = [endX, endY];
    while (current) {
        path.push(current);
        current = predecessors[current[0]][current[1]];
    }
    path.reverse();
    return path;
}


// Функция для добавления дороги на карту
function addRoadToGrid(path) {
    for (let [x, y] of path) {
        if (grid[x][y] !== "city") {
            grid[x][y] = "road"; // Обновляем клетку как дорогу
        }
    }
    drawGrid(); // Перерисовываем карту
}

async function updateMapAndFindPaths() {
    const cities = [];

    // Собираем список городов
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            if (grid[x][y] === "city") {
                cities.push(`${x},${y}`);
                console.log(`City found at ${x},${y}`);
            }
        }
    }

    // Проверяем, что найдено хотя бы два города
    if (cities.length < 2) {
        alert("Добавьте хотя бы два города!");
        return;
    }

    // Проверяем, что start и end определены
    const start = cities[0];
    const end = cities[1];
    if (!start || !end) {
        console.error("Start or end point is undefined:", start, end);
        alert("Ошибка: начальная или конечная точка не определена!");
        return;
    }

    // Ищем путь
    try {
        const path = await findShortestPath(start, end);
        if (path) {
            addRoadToGrid(path);
            drawGrid();
        } else {
            alert(`Не удалось найти путь между ${start} и ${end}`);
        }
    } catch (error) {
        console.error("Error finding path:", error);
        alert("Ошибка при поиске пути!");
    }
}