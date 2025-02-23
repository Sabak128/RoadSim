const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 40;
const gridWidth = Math.floor(window.innerWidth / cellSize * 0.85);
const gridHeight = Math.floor(window.innerHeight / cellSize * 0.9);
let mode = 'city';
let grid = Array.from({ length: gridWidth }, () => Array(gridHeight).fill(0));
let isDrawing = false;

canvas.width = gridWidth * cellSize;
canvas.height = gridHeight * cellSize;

function setMode(newMode) {
    mode = newMode;
    console.log("Режим установлен:", mode);
}

function drawCell(x, y, fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeStyle = "#ccc";
    ctx.strokeRect(x, y, cellSize, cellSize);
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            let posX = x * cellSize;
            let posY = y * cellSize;
            switch (grid[x][y]) {
                case 'city': drawCell(posX, posY, "#3498db"); break;
                case 'mountain': drawCell(posX, posY, "#7f8c8d"); break;
                case 'swamp': drawCell(posX, posY, "#27ae60"); break;
                default: drawCell(posX, posY, "#ecf0f1");
            }
        }
    }
}

function clearMap() {
    grid = Array.from({ length: gridWidth }, () => Array(gridHeight).fill(0));
    drawGrid();
}

function handleMouseAction(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const col = Math.floor(mouseX / cellSize);
    const row = Math.floor(mouseY / cellSize);
    
    if (col >= 0 && col < gridWidth && row >= 0 && row < gridHeight) {
        grid[col][row] = mode === 'erase' ? 0 : mode;
        drawGrid();
    }
}

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", (event) => { if (isDrawing) handleMouseAction(event); });
canvas.addEventListener("click", handleMouseAction);
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    handleMouseAction(event);
});

window.addEventListener("keydown", (event) => {
    if (event.key === "1") setMode('city');
    if (event.key === "2") setMode('mountain');
    if (event.key === "3") setMode('swamp');
    if (event.key === "4") setMode('erase');
});

function saveMap() {
    const mapName = document.getElementById("mapName").value;
    if (!mapName) {
        alert("Введите название карты!");
        return;
    }
    const mapData = JSON.stringify(grid);
    localStorage.setItem(mapName, mapData);
    alert(`Карта "${mapName}" сохранена!`);
}

function loadMap() {
    const mapName = document.getElementById("mapName").value;
    if (!mapName) {
        alert("Введите название карты!");
        return;
    }
    const mapData = localStorage.getItem(mapName);
    if (mapData) {
        grid = JSON.parse(mapData);
        drawGrid();
        alert(`Карта "${mapName}" загружена!`);
    } else {
        alert(`Карта "${mapName}" не найдена!`);
    }
}

function clearStorage() {
    localStorage.clear();
    alert("Все карты удалены!");
}

function deleteMap() {
    const mapName = document.getElementById("mapName").value;
    if (!mapName) {
        alert("Введите название карты!");
        return;
    }
    localStorage.removeItem(mapName);
    alert(`Карта "${mapName}" удалена!`);
}


drawGrid();
