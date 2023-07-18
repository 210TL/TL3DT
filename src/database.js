const fs = require('fs');
const bcrypt = require('bcrypt');
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
`);
var salt = bcrypt.genSaltSync(10);
db.run(`CREATE TABLE Users (
	Id INTEGER PRIMARY KEY AUTOINCREMENT,
	Username text, 
	Email text, 
	Password text,             
	Salt text,    
	Token text,
	DateLoggedIn DATE,
	DateCreated DATE
	)`, (err) => {
	if (err) {
			// Table already created
	} else{
			// Table just created, creating some rows
			var insert = 'INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)'
			db.run(insert, ["user1", "user1@example.com", bcrypt.hashSync("user1", salt), salt, Date('now')])
			db.run(insert, ["user2", "user2@example.com", bcrypt.hashSync("user2", salt), salt, Date('now')])
			db.run(insert, ["user3", "user3@example.com", bcrypt.hashSync("user3", salt), salt, Date('now')])
			db.run(insert, ["user4", "user4@example.com", bcrypt.hashSync("user4", salt), salt, Date('now')])
	}
});

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
