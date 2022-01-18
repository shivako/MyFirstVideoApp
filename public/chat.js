var socket = io.connect("")
var divVideoChatLobby = document.getElementById("video-chat-lobby")
var roomName = document.getElementById("roomName")
var joinButton = document.getElementById("join")
var divVideoChatRoom = document.getElementById("video-chat-room")
var userVideo = document.getElementById("user-video")
var peerVideo = document.getElementById("peer-video")

joinButton.addEventListener('click', function(){
    if (roomName.value == ""){
        alert("Please enter Room Name")
    }else{
        socket.emit("join", roomName.value)
        console.log("about to getUserMedia")
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
    }
}
);

