var socket = io.connect("")
var divVideoChatLobby = document.getElementById("video-chat-lobby")
var roomNameHolder = document.getElementById("roomName")
var joinButton = document.getElementById("join")
var divVideoChatRoom = document.getElementById("video-chat-room")
var userVideo = document.getElementById("user-video")
var peerVideo = document.getElementById("peer-video")
var roomName = roomNameHolder.value

var creator = false;

joinButton.addEventListener('click', function(){
    if (roomName == ""){
        alert("Please enter Room Name")
    }else{
        socket.emit("join", roomName)
 
    }
}
);

socket.on("created", function(){
    creator = true;
    console.log("about to getUserMedia");
    navigator.getUserMedia(
    {
            audio: false,
            video: { width: 1280, height: 720 }
    }    
    , 
    
    function(stream){
        divVideoChatLobby.style ="display:none"
        userVideo.srcObject = stream ;
        userVideo.onloadedmetadata = function(e){
            userVideo.play();
        }

    }, 
    
    function(err){
        console.log("could not access usermedia", err)
        alert("could not access usermedia", err)
    });
});

socket.on("joined", function(){
    creator = false;
    console.log("about to getUserMedia");
    navigator.getUserMedia(
    {
            audio: false,
            video: { width: 1280, height: 720 }
    }    
    , 
    
    function(stream){
        divVideoChatLobby.style ="display:none"
        userVideo.srcObject = stream ;
        userVideo.onloadedmetadata = function(e){
            userVideo.play();
        }

    }, 
    
    function(err){
        console.log("could not access usermedia", err)
        alert("could not access usermedia", err)
    });
});

socket.on("full", function(){
    alert("Room is full, Can't join");
});

socket.on("ready", function(){

});

socket.on("candidate", function(){

});

socket.on("offer", function(){

});

socket.on("answer", function(){

});
