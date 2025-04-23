const translations = {
    ru: {
        start: "Начать",
        price: "Цена дороги:",
        priceMountain: "Цена дороги в горах:",
        priceSwamp: "Цена дороги в болоте:",
        priceWater: "Цена дороги в воде:",
        priceRoad: "Цена дороги в городе:",
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
        settings: "Настройки",
        cityColor: "Цвет города:",
        swampColor: "Цвет болота:",
        mountainColor: "Цвет гор:",
        waterColor: "Цвет воды:",
        roadColor: "Цвет дороги:",
        size: "Размер:",
        paintSize: "Размер кисти:",
        resetColors: "Сбросить цвета",
        resetAll: "Стандартные цвета",
    },
    en: {
        start: "Start",
        price: "Road price:",
        priceMountain: "Mountain road price:",
        priceSwamp: "Swamp road price:",
        priceWater: "Water road price:",
        priceRoad: "Road price in Road:",
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
        settings: "Settings",
        cityColor: "City color:",
        swampColor: "Swamp color:",
        mountainColor: "Mountain color:",
        waterColor: "Water color:",
        roadColor: "Road color:",
        size: "Size:",
        paintSize: "Brush size:",
        resetColors: "Reset colors",
        resetAll: "Default colors",
    },
    ge: {
        start: "დაწყება",
        price: "გზის ფასი:",
        priceMountain: "გზის ფასი მთაში:",
        priceSwamp: "გზის ფასი ჭაობში:",
        priceWater: "გზის ფასი წყალში:",
        priceRoad: "გზის ფასი გზაზე:",
        city: "ქალაქი",
        mountain: "მთა",
        swamp: "ჭაობი",
        water: "წყალი",
        erase: "საშლელი",
        clearMap: "ყველაფრის გასუფთავება",
        saveMap: "შენახვა",
        loadMap: "ჩატვირთვა",
        deleteMap: "წაშლა",
        clearStorage: "შენახვის გასუფთავება",
        mapNamePlaceholder: "რუკის სახელი",
        close: "დახურვა",
        settings: "პარამეტრები",
        cityColor: "ქალაქის ფერი:",
        swampColor: "ჭაობის ფერი:",
        mountainColor: "მთის ფერი:",
        waterColor: "წყლის ფერი:",
        roadColor: "გზის ფერი:",
        size: "ზომა:",
        paintSize: "ხატვის ზომა:",
        resetColors: "ფერთა აღდგენა",
        resetAll: "სტანდარტული ფერები",
    },
};


function changeLanguage() {
    const language = document.getElementById("language").value;
    localStorage.setItem("selectedLanguage", language);
    const langData = translations[language];

    document.getElementById("start").textContent = langData.start;
    document.querySelector('label[for="prise_road"]').textContent = langData.price;
    document.querySelector('label[for="prise_road_in_mountine"]').textContent = langData.priceMountain;
    document.querySelector('label[for="prise_road_in_swamp"]').textContent = langData.priceSwamp;
    document.querySelector('label[for="prise_road_in_water"]').textContent = langData.priceWater;
    document.querySelector('label[for="prise_road_in_road"]').textContent = langData.priceRoad;

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
    document.querySelector('label[for="city-color"]').textContent = langData.cityColor;
    document.querySelector('label[for="swamp-color"]').textContent = langData.swampColor;
    document.querySelector('label[for="mountain-color"]').textContent = langData.mountainColor;
    document.querySelector('label[for="water-color"]').textContent = langData.waterColor;
    document.querySelector('label[for="road-color"]').textContent = langData.roadColor;

    document.querySelector('label[for="size"]').textContent = langData.size;
    document.querySelector('label[for="paint-size"]').textContent = langData.paintSize;
    
    document.getElementById("reset-all").textContent = langData.resetAll;
}

window.onload = function () {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    document.getElementById("language").value = savedLanguage;
    changeLanguage(); 
};
