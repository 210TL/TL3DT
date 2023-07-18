const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 80;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index', {title: '3DTracker', description: 'Test description'});
});

server.listen(PORT, () => {
	console.log("Listening on port", PORT);
})