config = {
    locateFile: filename => `/dist/${filename}`
};

initSqlJs(config).then(function(SQL){
    // Create or open the database
    const db = new SQL.Database();

    // Create a table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS maps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      width INTEGER,
      height INTEGER,
      scale INTEGER,
      noiseScale REAL,
      zoomFactor REAL,
      seed INTEGER,
      created_at TEXT
    );`);

    // Function to save map parameters
    function saveMapParams(width, height, scale, noiseScale, zoomFactor, seed) {
        const createdAt = new Date().toISOString();
        db.run(`INSERT INTO maps (width, height, scale, noiseScale, zoomFactor, seed, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [width, height, scale, noiseScale, zoomFactor, seed, createdAt]);

        console.log("Map parameters saved to database.");
    }

    // Function to query and display saved maps
    function displaySavedMaps() {
        const stmt = db.prepare("SELECT * FROM maps");
        const mapList = document.getElementById('map-list');
        
        while (stmt.step()) {
            const row = stmt.getAsObject();
            const listItem = document.createElement('li');
            listItem.textContent = `Map: Width=${row.width}, Height=${row.height}, Scale=${row.scale}, NoiseScale=${row.noiseScale}, ZoomFactor=${row.zoomFactor}, Seed=${row.seed}, Created At=${row.created_at}`;
            mapList.appendChild(listItem);
        }
    }

    // Attach generateMap to button or input triggers
    function generateMap() {
        width = parseInt(document.getElementById('width').value);
        height = parseInt(document.getElementById('height').value);
        scl = parseInt(document.getElementById('scale').value);
        noiseScale = parseFloat(document.getElementById('noiseScale').value);
        zoomFactor = parseFloat(document.getElementById('zoomFactor').value);
        seed = parseInt(document.getElementById('seed').value) || Math.floor(Math.random() * 10000);

        // Save the parameters to the database
        saveMapParams(width, height, scl, noiseScale, zoomFactor, seed);

        // Redirect to map display
        let url = `map_display.html?width=${width}&height=${height}&scale=${scl}&noiseScale=${noiseScale}&zoomFactor=${zoomFactor}&seed=${seed}`;
        window.location.href = url;
    }

    // Check if we are on the "maps.html" page and display the maps
    if (window.location.pathname.includes("maps.html")) {
        displaySavedMaps();
    }
});
