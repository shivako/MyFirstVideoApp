const express = require("express");
const socket = require("socket.io");
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
            console.log("Room not found: "+ roomName)
            socket.join(roomName)
            socket.emit("created")
        }else if (room.size ==1 ){
            socket.join(roomName)
            socket.emit("joined")
        }else {
            socket.emit("full")
            console.log("Room is full for now: "+ roomName)
        }
    });

    socket.on("ready", function(roomName){
        console.log("Ready event ")
        socket.broadcast.to(roomName).emit("ready")
    }
    );

    socket.on("candidate", function(candidate, roomName ){
        console.log("Candidate event ")
        socket.broadcast.to(roomName).emit("candidate", candidate);
    }
    );

    socket.on("offer", function(offer, roomName ){
        console.log("Offer event ")
        socket.broadcast.to(roomName).emit("offer", offer);
    }
    );

    socket.on("answer", function(answer, roomName ){
        console.log("Answer event ")
        socket.broadcast.to(roomName).emit("answer", answer);
    }
    );

});
