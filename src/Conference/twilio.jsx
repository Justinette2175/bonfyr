var videoClient;
var activeRoom;
var previewMedia;
var identity;
var roomName;

import Auth from "../auth-helper.js";

// var localUsername = Auth.retrieveUser().username

// Successfully connected!
function roomJoined(room, teacherUsername, username) {
  activeRoom = room;
  console.log('got to roomJoined');

  let $local = document.getElementById('teacher-media');
  console.log($local);
  // log("Joined as '" + identity + "'");
  // document.getElementById('button-join').style.display = 'none';
  // document.getElementById('button-leave').style.display = 'inline';

  console.log("teacher", teacherUsername)
  console.log("user", username)

  if (teacherUsername === username){
    room.localParticipant.media.attach('#teacher-media');
  }
  else {
    room.localParticipant.media.attach('#student-media');
    document.getElementById(`${username}`).setAttribute("class", 'connected');
  }
  room.participants.forEach(function(participant) {
    console.log("participant", participant)
    if (participant.identity === teacherUsername){
      participant.media.attach('#teacher-media');
    }
    else{
      participant.media.attach('#student-media');
      console.log('identity', participant.identity)
      document.getElementById(`${participant.identity}`).setAttribute("class", 'connected');
    }
  });


  // When a participant joins, draw their video on screen
  room.on('participantConnected', function (participant) {
    // log("Joining: '" + participant.identity + "'");
    if (participant.identity === teacherUsername){
      participant.media.attach('#teacher-media');
    }
    else{
      participant.media.attach('#student-media');
      document.getElementById(`${participant.identity}`).setAttribute("class", 'connected');
    }
  });

  // When a participant disconnects, note in log
  room.on('participantDisconnected', function (participant) {
    // log("Participant '" + participant.identity + "' left the room");
    participant.media.detach();
  });

  // When we are disconnected, stop capturing local video
  // Also remove media for all remote participants
  room.on('disconnected', function () {
    // log('Left');
    room.localParticipant.media.detach();
    room.participants.forEach(function(participant) {
      participant.media.detach();
      document.getElementById(`${participant.identity}`).removeAttribute("class", 'connected');
    });
    activeRoom = null;
    // document.getElementById('button-leave').style.display = 'none';
  });

  // When we are about to transition away from this page, disconnect from the room, if joined.
  window.addEventListener('unload', leaveRoomIfJoined);
  $("#logout, #dashboard, h1").click(()=>{
    leaveRoomIfJoined();
  })
}

//  Local video preview
// document.getElementById('button-preview').onclick = function () {
//   if (!previewMedia) {
//     previewMedia = new Twilio.Video.LocalMedia();
//     Twilio.Video.getUserMedia().then(
//     function (mediaStream) {
//       previewMedia.addStream(mediaStream);
//       previewMedia.attach('#teacher-media');
//     },
//     function (error) {
//       console.error('Unable to access local media', error);
//       log('Unable to access Camera and Microphone');
//     });
//   };
// };

// Activity log
// function log(message) {
//   var logDiv = document.getElementById('log');
//   logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
//   logDiv.scrollTop = logDiv.scrollHeight;
// }


function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}


module.exports = {
  startTwilio(roomName, userId){
    console.log("twilio starting");
    $.getJSON(`https://teachurbuddy4.herokuapp.com/token/${userId}/class/${roomName}`, function (data) {

      identity = data.identity.username;
      let teacherUsername = data.identity.teacher;

      // Create a Video Client and connect to Twilio
      videoClient = new Twilio.Video.Client(data.token);
      // document.getElementById('room-controls').style.display = 'block';

      // Bind button to join room

        if (roomName) {
          // log("Joining room '" + roomName + "'...");

          videoClient.connect({ to: roomName}).then(function(room){
            roomJoined(room, teacherUsername, identity);
          },
            function(error) {
              console.log('Could not connect to Twilio: ' + error.message);
            });
        } else {
          alert('Please enter a room name.');
        }

      //Bind button to leave room
      document.getElementById('button-leave').onclick = function () {
        log('Leaving room...');
        activeRoom.disconnect();
      };
    });
  },
}







