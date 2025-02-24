const translations = {
    ru: {
        start: "Начать",
        priceRoad: "Цена дороги:",
        priceMountain: "Цена дороги в горах:",
        priceSwamp: "Цена дороги в болоте:",
        city: "Город",
        mountain: "Гора",
        swamp: "Болото",
        water: "Вода",
        erase: "Ластик",
        clearMap: "Убрать всё",
        saveMap: "Сохранить",
        loadMap: "Загрузить",
        deleteMap: "Удалить",
        clearStorage: "Очистить сохранение",
        mapNamePlaceholder: "Имя карты",
        close: "Закрыть",
    },
    en: {
        start: "Start",
        priceRoad: "Road price:",
        priceMountain: "Mountain road price:",
        priceSwamp: "Swamp road price:",
        city: "City",
        mountain: "Mountain",
        swamp: "Swamp",
        water: "Water",
        erase: "Eraser",
        clearMap: "Clear all",
        saveMap: "Save",
        loadMap: "Load",
        deleteMap: "Delete",
        clearStorage: "Clear storage",
        mapNamePlaceholder: "Map name",
        close: "Close",
    },
    ge: {
        start: "დაწყება",
        priceRoad: "გზის ფასი:",
        priceMountain: "გზის ფასი მთაში:",
        priceSwamp: "გზის ფასი ჭაობში:",
        city: "ქალაქი",
        mountain: "მთა",
        swamp: "ჭაობი",
        water: "წყალი",
        erase: "შაშლელი",
        clearMap: "ყველაფრის გასუფთავება",
        saveMap: "შენახვა",
        loadMap: "ჩატვირთვა",
        deleteMap: "წაშლა",
        clearStorage: "შენახვის გასუფთავება",
        mapNamePlaceholder: "რუკის სახელი",
        close: "დახურვა",
    },
};

function changeLanguage() {
    const language = document.getElementById("language").value;
    localStorage.setItem("selectedLanguage", language);
    const langData = translations[language];

    document.getElementById("start").textContent = langData.start;
    document.querySelector('label[for="prise_road"]').textContent = langData.priceRoad;
    document.querySelector('label[for="prise_road_in_mountine"]').textContent = langData.priceMountain;
    document.querySelector('label[for="prise_road_in_swamp"]').textContent = langData.priceSwamp;
    document.getElementById("city").textContent = langData.city;
    document.getElementById("mountain").textContent = langData.mountain;
    document.getElementById("swamp").textContent = langData.swamp;
    document.getElementById("water").textContent = langData.water;  
    document.getElementById("erase").textContent = langData.erase;
    document.getElementById("clearMap").textContent = langData.clearMap;
    document.getElementById("saveMap").textContent = langData.saveMap;
    document.getElementById("loadMap").textContent = langData.loadMap;
    document.getElementById("deleteMap").textContent = langData.deleteMap;
    document.getElementById("clearStorge").textContent = langData.clearStorage;
    document.getElementById("mapName").placeholder = langData.mapNamePlaceholder;
    document.getElementById("close").textContent = langData.close;
}

window.onload = function () {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    document.getElementById("language").value = savedLanguage;
    changeLanguage(); 
};

