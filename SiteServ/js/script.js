const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 40;
const gridWidth = Math.floor(window.innerWidth / cellSize * 0.85);
const gridHeight = Math.floor(window.innerHeight / cellSize * 0.9);
let isDrawing = false;
let mode = "city";
let grid = Array.from({ length: gridWidth }, () => Array(gridHeight).fill(0));

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
                case "city": drawCell(posX, posY, "#e1b40e"); break;
                case "mountain": drawCell(posX, posY, "#27ae60"); break;
                case "swamp": drawCell(posX, posY, "#698339"); break;
                case "water": drawCell(posX, posY, "#3498db"); break;
                case "road": drawCell(posX, posY, "#2a2922"); break;
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
        grid[col][row] = mode === "erase" ? 0 : mode;
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
    if (event.key === "1") setMode("city");
    if (event.key === "2") setMode("mountain");
    if (event.key === "3") setMode("swamp");
    if (event.key === "4") setMode("water");
    if (event.key === "5") setMode("erase");
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

document.getElementById("prise_road_in_mountine").value = 70;
document.getElementById("prise_road_in_swamp").value = 100;
document.getElementById("prise_road_in_water").value = 50;
document.getElementById("prise_road_in_road").value = 5;
document.getElementById("prise_road").value = 30;

async function sendGridToServer() {
    let terrain_costs = {
        "city": 0,
        "mountain": Number(document.getElementById("prise_road_in_mountine").value) || 70,
        "swamp": Number(document.getElementById("prise_road_in_swamp").value) || 100,
        "water": Number(document.getElementById("prise_road_in_water").value) || 50,
        "road": Number(document.getElementById("prise_road_in_road").value) || 5,
        "emty": Number(document.getElementById("prise_road").value) || 30
    }
    const response = await fetch("http://127.0.0.1:5000/process_grid", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ grid, terrain_costs })
    });

    if (response.ok) {
        const data = await response.json();
        grid = data.grid;
        drawGrid();
    } else {
        console.error("Ошибка сервера");
    }
}

function toggleSettings() {
    const modal = document.getElementById("settings-modal");
    modal.classList.toggle("hidden");
}

drawGrid();