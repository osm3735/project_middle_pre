function updateMapContentByHash(points) {
    const hash = window.location.hash.replace('#', '');
    console.log(hash, points);

    const selected = points.find(p => String(p.map_id) === String(hash));

    const contentElement = document.getElementById('map_content');
    const mapElement = document.getElementById('map');
    
    console.log(mapElement, contentElement, hash, selected);
    if (mapElement && contentElement) {
        if (hash && selected) {
            updateMapCenter(selected.lat, selected.lng, 16);
            
            mapElement.style.width = '500px';
            contentElement.style.display = 'block';
            contentElement.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr auto; align-items: center; margin-bottom: 10px;">
                    <h2>${selected.title}</h2>
                    <button id="close_map_content" style="font-size: 20px;">✕</button>
                </div>
                <p>${selected.content}</p>
            `;
            const closeBtn = document.getElementById('close_map_content');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    location.hash = ''; // 해시 제거 → 자동 초기화
                });
            }
        } else {
            // 지도 위치/줌은 그대로 두고 UI만 변경
            mapElement.style.width = '100%';
            contentElement.style.display = 'none';
            contentElement.innerHTML = '';
        }
    }
}

window.addEventListener('hashchange', () => {
    readTextFile("json/map_points.json", function (pointText) {
        const data = JSON.parse(pointText);
        updateMapContentByHash(data.points);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        readTextFile("json/map_points.json", function (pointText) {
            const data = JSON.parse(pointText);
            updateMapContentByHash(data.points);
        });
    }
});

window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            readTextFile("json/map_points.json", function (pointText) {
                const data = JSON.parse(pointText);
                updateMapContentByHash(data.points);
            });
        }, 1000); // 1초 후 재시도
    }
});