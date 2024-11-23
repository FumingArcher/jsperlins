const sqlite3 = require("sqlite3");

class Database {
    constructor(name) {
        this.name = name;
        this.init();
    }

    async init() {
        var connection = await new Promise((resolve, reject) => {
            // connect to the database
            this.db = new sqlite3.Database(env.DATABASE_PATH, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else{
                console.log('connected to the database');
                resolve();
                }
            });
        });

        then(() => {
            // Create tables in the database
            return Promise.all([
                this.run(
                    `CREATE TABLE IF NOT EXISTS maps (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(255) UNIQUE NOT NULL,
                        width INTEGER NOT NULL,
                        height INTEGER NOT NULL,
                        scale INTEGER NOT NULL,
                        noiseScale REAL NOT NULL,
                        zoomFactor REAL NOT NULL,
                        seed INTEGER NOT NULL
                    );
                `)
            ]);
        })
        .catch((err) => {
            console.error('Error creating tables:', err);
        });

        return connection;
    }

    async run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });
        });
    }

    async get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, function (err, results) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }

    async all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, function (err, results) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = Database;