function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

readTextFile("config.json", function (text) {
    var data_config = JSON.parse(text);
    const API_KEY = data_config.apiKey;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = function () {
        const center = { lat: 37.5665, lng: 126.9780 };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: center
        });

        readTextFile("map_points.json", function (pointText) {
            const data = JSON.parse(pointText);
            const points = data.points;

            const markers = points.map(p => {
                const marker = new google.maps.Marker({
                    position: { lat: p.lat, lng: p.lng },
                    title: p.title || ""
                });

                if (p.title) {
                    const info = new google.maps.InfoWindow({
                        content: `<strong>${p.title}</strong>`
                    });

                    marker.addListener("click", () => info.open(map, marker));
                }

                return marker;
            });

            new markerClusterer.MarkerClusterer({ map, markers });
        });
    };
});
