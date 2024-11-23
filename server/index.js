const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = require('../server/db.js');

const app = express();
const port = 3000;

// Middleware, SERVES STATIC FILES
app.use(express.static(path.join(__dirname, '../static')));
app.use(bodyParser.json());

app.get('/src/:fileName', (req, res) => {
    const filePath = path.join(__dirname, '../src', req.params.fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

// Middleware, SERVES STATIC FILES


console.log('Serving static files from:', path.join(__dirname, '../src'));

// serves the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'index.html'));
});

//A route to save data
app.post('/api/maps', (req, res) => {
    const { width, height, scale, noiseScale, zoomFactor, seed } = req.body;

    const query = `INSERT INTO maps (width, height, scale, noiseScale, zoomFactor, seed) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [width, height, scale, noiseScale, zoomFactor, seed];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Error inserting into database:', err.message);
            res.status(500).send('Failed to save map.');
        } else {
            res.status(201).send({ id: this.lastID });
        }
    });
});

// A route to get all saved maps
app.get('/api/maps', (req, res) => {
    db.all(`SELECT * FROM maps`, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving maps:', err.message);
            res.status(500).send('Failed to fetch maps.');
        } else {
            res.status(200).send(rows);
        }
    });
});

//the port initialization
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
