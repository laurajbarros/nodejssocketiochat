var express = require("express");
var app = express();
var port = 3700;
ejs = require("ejs");
connections = [];
users = [];

//APP CONFIG -> EJS
app.set("view engine","ejs");


app.get("/", function(req, res){
    res.render("chat");
});

app.use(express.static(__dirname + '/public'));


var io = require('socket.io').listen(app.listen(port));
	io.sockets.on('connection', function (socket) {
		console.log(socket.nsp.name);
	connections.push(socket);
	io.sockets.emit('numberofusers', connections.length);
	console.log("1 + Connected, total connected: " + connections.length);
	socket.emit('message', { message: 'welcome to the chat' });
    

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on("disconnect",function(data){	
    	connections.splice(connections.indexOf(socket),1)
    	console.log("1 Disconnected, total connected:" + connections.length);
    })

    //add to database
    // socket.on("register",function(data){
    // 	users.push(data);
    // 	console.log(users);
    // })
});
console.log("lsitening");

