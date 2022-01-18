const express = require("express");
const app = express();

var server = app.listen(4000, function(){
    console.log("server running")
});

app.use(express.static('public'));

var io = socket(server);

io.on("connection", function(socket){
    console.log("User Connected: "+socket.id)

    socket.on("join", function(roomName){
        console.log("User joined in a room: "+roomName)
        var rooms = io.sockets.adapter.rooms
        console.log("rooms: "+ rooms)
        var room = rooms.get(roomName);
        if (room  ==  undefined){
            socket.join(roomName)
        }else if (room.size ==1 ){
            socket.join(roomName)
        }else {
            console.log("Room is full for now: "+ roomName)
        }
    });
});
