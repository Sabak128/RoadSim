function toggleSettings() {
    const modal = document.getElementById("settings-modal");
    modal.classList.toggle("hidden");
}

function resetCityColor() {
    const cityColorInput = document.getElementById("city-color");
    cityColorInput.value = "#e1b40e";
}

function resetSwampColor() {
    const swampColorInput = document.getElementById("swamp-color");
    swampColorInput.value = "#698339";
}

function resetMountainColor() {
    const mountainColorInput = document.getElementById("mountain-color");
    mountainColorInput.value = "#27ae60";
}

function resetWaterColor() {
    const waterColorInput = document.getElementById("water-color");
    waterColorInput.value = "#3498db"; 
}

function resetRoadColor() {
    const roadColorInput = document.getElementById("road-color");
    roadColorInput.value = "#2a2922"; 
}

function resetAllColors() {
    resetCityColor();
    resetSwampColor();
    resetMountainColor();
    resetWaterColor();
    resetRoadColor();
}
