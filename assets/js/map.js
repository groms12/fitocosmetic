document.addEventListener("DOMContentLoaded", function() {
    // переключение между картами (почта/деливери)
    let tabsBtn = document.querySelectorAll('.tab');
    let tabsStages = document.querySelectorAll('.map');
    tabsBtn.forEach(function(element) {
        element.addEventListener('click', function(e) {
            const path = e.currentTarget.dataset.path;
            tabsBtn.forEach(function(btn) {
                btn.classList.remove('active')
            });
            e.currentTarget.classList.add('active');
            tabsStages.forEach(function(element) {
                element.classList.remove('active')
            });
            document.querySelector(`[data-target="${path}"]`).classList.add('active');
        });
    });

    let infoBlock = document.querySelector('.info-map');
    let worktimeValue = document.querySelector('.worktime-value');
    let addressValue = document.querySelector('.address');

    // карта для почты
    ymaps.ready(function() {
        let myMap = new ymaps.Map(
            "pochta-map", {
                center: [55.742630233411695, 37.62745766988369],
                zoom: 12,
            }, {
                searchControlProvider: "yandex#search",
            }
        );

        let points = [{
                "city": "Москва",
                "coordinates": [55.79424531765481, 37.56372813183594],
                "address": "Москва,ул.№1,д.1",
                "time": "08:00-20:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.79424531765481, 37.66741160351563],
                "address": "Москва,ул.№2,д.2",
                "time": "09:00-21:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.7598020549478, 37.65573862988282],
                "address": "Москва,ул.№3,д.3",
                "time": "10:00-22:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.74237528405158, 37.63170603710939],
                "address": "Москва,ул.№4,д.4",
                "time": "07:00-22:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.75360676544543, 37.62277964550782],
                "address": "Москва,ул.№5,д.5",
                "time": "12:00-20:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.957301348828096, 30.309309901048533],
                "address": "Санкт-Петербург,ул.№1,д.1",
                "time": "12:00-20:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.93560039242605, 30.312743128587616],
                "address": "Санкт-Петербург,ул.№2,д.2",
                "time": "12:00-21:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.934911239728, 30.334029139329793],
                "address": "Санкт-Петербург,ул.№3,д.3",
                "time": "10:00-18:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.92388284234111, 30.32510274772822],
                "address": "Санкт-Петербург,ул.№4,д.4",
                "time": "08:00-16:00"
            },
        ];

        function updateMapCenter(cityName) {
            ymaps.geocode(cityName).then(function(res) {
                let firstGeoObject = res.geoObjects.get(0);
                let coords = firstGeoObject.geometry.getCoordinates();
                myMap.setCenter(coords);
            });
        }

        updateMapCenter('Москва');

        // let currentCity = "Москва";
        // let input = document.querySelector('.city');
        // let btn = document.querySelector('.city-btn');
        // btn.addEventListener('click', function() {
        //     let currentCity = input.value;
        //     updateMapCenter(currentCity);
        // })
        let select = document.querySelector('.select-city');
        select.addEventListener('change', function() {
            let cityName = this.value;
            updateMapCenter(cityName);
        });

        const objectManager = new ymaps.ObjectManager({
            clusterize: false,
        });

        const features = points.map((element, index) => {
            return {
                id: index,
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: element.coordinates,
                },
                properties: {
                    city: element.city,
                    address: element.address,
                    time: element.time,
                },
                options: {
                    iconLayout: "default#imageWithContent",
                    iconImageHref: "assets/img/map/pochta.svg",
                    iconImageSize: [61, 73],
                    iconImageOffset: [-24, -24],
                    iconContentOffset: [45, 10],
                },
            };
        });

        const collection = {
            type: "FeatureCollection",
            features,
        };

        objectManager.events.add("click", function(event) {
            let objectId = event.get("objectId");
            let object = objectManager.objects.getById(objectId);
            let city = object.properties.city;
            let address = object.properties.address;
            let time = object.properties.time;

            infoBlock.classList.add('active');
            worktimeValue.textContent = time;
            addressValue.textContent = address;
        });

        objectManager.add(collection);
        myMap.geoObjects.add(objectManager);
    });


    // карта деливери
    ymaps.ready(function() {
        let myMap = new ymaps.Map(
            "delivery-map", {
                center: [55.742630233411695, 37.62745766988369],
                zoom: 12,
            }, {
                searchControlProvider: "yandex#search",
            }
        );

        let points = [{
                "city": "Москва",
                "coordinates": [55.79429531765481, 37.56372713183594],
                "address": "Москва,ул.№1,д.1",
                "time": "08:00-20:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.79429531765481, 37.66741760351563],
                "address": "Москва,ул.№2,д.2",
                "time": "09:00-21:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.7598920549478, 37.65573872988282],
                "address": "Москва,ул.№3,д.3",
                "time": "10:00-22:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.74239528405158, 37.63170703710939],
                "address": "Москва,ул.№4,д.4",
                "time": "07:00-22:00"
            },
            {
                "city": "Москва",
                "coordinates": [55.75369676544543, 37.62277764550782],
                "address": "Москва,ул.№5,д.5",
                "time": "12:00-20:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.957301348828096, 30.309309901048533],
                "address": "Санкт-Петербург,ул.№1,д.1",
                "time": "12:00-20:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.93560039242605, 30.312743128587616],
                "address": "Санкт-Петербург,ул.№2,д.2",
                "time": "12:00-21:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.934911239728, 30.334029139329793],
                "address": "Санкт-Петербург,ул.№3,д.3",
                "time": "10:00-18:00"
            },
            {
                "city": "Санкт-Петербург",
                "coordinates": [59.92388284234111, 30.32510274772822],
                "address": "Санкт-Петербург,ул.№4,д.4",
                "time": "08:00-16:00"
            },
        ];

        function updateMapCenter(cityName) {
            ymaps.geocode(cityName).then(function(res) {
                let firstGeoObject = res.geoObjects.get(0);
                let coords = firstGeoObject.geometry.getCoordinates();
                myMap.setCenter(coords);
            });
        }

        updateMapCenter('Москва');

        // let currentCity = "Москва";
        // let input = document.querySelector('.city');
        // let btn = document.querySelector('.city-btn');
        // btn.addEventListener('click', function() {
        //     let currentCity = input.value;
        //     updateMapCenter(currentCity);
        // })
        let select = document.querySelector('.select-city');
        select.addEventListener('change', function() {
            let cityName = this.value;
            updateMapCenter(cityName);
        });

        const objectManager = new ymaps.ObjectManager({
            clusterize: false,
        });

        const features = points.map((element, index) => {
            return {
                id: index,
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: element.coordinates,
                },
                properties: {
                    city: element.city,
                    address: element.address,
                    time: element.time,
                },
                options: {
                    iconLayout: "default#imageWithContent",
                    iconImageHref: "assets/img/map/delivery.svg",
                    iconImageSize: [61, 73],
                    iconImageOffset: [-24, -24],
                    iconContentOffset: [45, 10],
                },
            };
        });

        const collection = {
            type: "FeatureCollection",
            features,
        };

        objectManager.events.add("click", function(event) {
            let objectId = event.get("objectId");
            let object = objectManager.objects.getById(objectId);
            let city = object.properties.city;
            let address = object.properties.address;
            let time = object.properties.time;

            infoBlock.classList.add('active');
            worktimeValue.textContent = time;
            addressValue.textContent = address;
        });

        objectManager.add(collection);
        myMap.geoObjects.add(objectManager);
    });
});