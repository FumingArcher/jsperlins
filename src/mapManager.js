async function fetchMaps() {
    try {
        const response = await fetch('/api/maps');
        const maps = await response.json();

        // Render maps to the UI
        const mapContainer = document.getElementById('map-container');
        mapContainer.innerHTML = '';  // Clear existing maps
        maps.forEach(map => {
            const mapElement = document.createElement('div');
            mapElement.className = 'map-entry';
            mapElement.textContent = `Map: ${map.name} (Width: ${map.width}, Height: ${map.height})`;
            mapContainer.appendChild(mapElement);

            // Optionally add functionality to load and display each map
            mapElement.addEventListener('click', () => loadMap(map));
        });
    } catch (err) {
        console.error('Failed to fetch maps:', err);
    }
}

function loadMap(map) {
    // Code to render the map based on its properties
    generateMap(map.width, map.height, map.scale, map.noiseScale, map.zoomFactor, map.seed);
}