const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();
const filepath = "./tdt_data.db";

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE prints
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    authorid  INTEGER NOT NULL,
    name   VARCHAR(50) NOT NULL,
    url VARCHAR(50) NOT NULL,
		description VARCHAR(50) NOT NULL
  );
  CREATE TABLE users
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name   VARCHAR(50) NOT NULL,
		printamount INTEGER NOT NULL,
		picturelink VARCHAR(50) NOT NULL
  );
`);
db.run(
	`INSERT INTO prints (authorid, name, url, description) VALUES (?, ?, ?, ?)`,
	[0, "Cool print", "https://github.com/210tl/tl3dt", "This is a cool print I found!"],
	function (error) {
		if (error) {
			console.error(error.message);
		}
		console.log(`Inserted a row with the ID: ${this.lastID}`);
	}
);
}

module.exports = createDbConnection();
