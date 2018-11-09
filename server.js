const express = require("express");
const app = express();
const server = require("http").Server(app)

const io = require("socket.io")(server);

app.get("/", function(request, response){
	response.sendFile(__dirname+"/chat.html");//send mainpage to client
});

let onlinecount = 0;
io.on("connect", (socket)=>{
	console.log("connect!!!");
	onlinecount++;
	io.emit("online",onlinecount);
	
	socket.on("disconnect", ()=>{
		onlinecount = (onlinecount -1 <0)?0:onlinecount - 1;
		
	})
	
	socket.on("send", (m)=>{
		console.log(m);
		io.emit("msg", m);
	});
});

server.listen(3000,()=>{
	console.log("in 127.0.0.1:3000");	
});

