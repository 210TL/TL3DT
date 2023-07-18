const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 80;

const db = require('./database');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use('/', express.static(path.resolve('./public')))

app.get('/', function(req, res) {
  res.render('pages/index', {title: '3DTracker', description: 'Test description'});
});

fs.readdirSync(path.resolve('./src/api/')).forEach(fileName => {
	if(require(path.resolve('./src/api/' + fileName)).route) {
		
	}
})

server.listen(PORT, () => {
	console.log("Listening on port", PORT);
})