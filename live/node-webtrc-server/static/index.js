(() => {
  let socket
  const btnLogin = document.querySelector('.btn-login')
  const nameInput = document.querySelector('.name-input')
  const userListEl = document.querySelector('.userList')
  const body = document.querySelector('body')
  window.mediaConstraints = {
    audio: true,            // We want an audio track
    video: {
      aspectRatio: {
        ideal: 1.333333     // 3:2 aspect is preferred
      }
    }
  }

  btnLogin.addEventListener('click', () => {
    window.myUserName = nameInput.value
    const option = {
      type: 'login',
      data: window.myUserName
    }
    socket.send(JSON.stringify(option))
  })
  // invite是后来填充的，用body捕获invite按钮
  body.addEventListener('click', (e) => {
    if(e.target.name === 'invite') {
      invite(e)
    }
  })

  function handle(message) {
    console.log(message, 'message')
    switch(message.type) {
      case 'login':
        if(!message.data) {
          alert(message.msg)
        }
        break;

      case 'userlist':
        userListEl.innerHTML = message.users.map(item => {
          return `
            <li><button name="invite">${item}</button></li>
          `
        }).join('')
        break;

      case "video-offer":  // Invitation and offer to chat
        handleVideoOfferMsg(message);
        break;

      case "video-answer":  // Callee has answered our offer
        handleVideoAnswerMsg(message);
        break;

      case "new-ice-candidate": // A new ICE candidate has been received
        handleNewICECandidateMsg(message);
        break;
    }
  }

  window.createPeerConnection = () => {
    window.myPeerConnection = new RTCPeerConnection({
      iceServers: [     // Information about ICE servers - Use your own!
        {
          urls: "turn:" + window.location.host,  // A TURN server
          username: "webrtc",
          credential: "turnserver"
        }
      ]
    })
    // connection handler
    window.myPeerConnection.onicecandidate = window.conncetionHandler.handleICECandidateEvent;
    window.myPeerConnection.oniceconnectionstatechange = window.conncetionHandler.handleICEConnectionStateChangeEvent;
    window.myPeerConnection.onicegatheringstatechange = window.conncetionHandler.handleICEGatheringStateChangeEvent;
    window.myPeerConnection.onsignalingstatechange = window.conncetionHandler.handleSignalingStateChangeEvent;
    window.myPeerConnection.onnegotiationneeded = window.conncetionHandler.handleNegotiationNeededEvent;
    window.myPeerConnection.ontrack = window.conncetionHandler.handleTrackEvent;
  }

  async function handleNewICECandidateMsg(msg) {
    var candidate = new RTCIceCandidate(msg.candidate);
  
    console.log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
    try {
      await window.myPeerConnection.addIceCandidate(candidate)
    } catch(err) {
      console.log(err);
    }
  }

  async function invite(evt) {
    console.log("Starting to prepare an invitation");
    if (window.myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {
      var clickedUsername = evt.target.textContent;
  
      // Don't allow users to call themselves, because weird.
  
      if (clickedUsername === window.myUsername) {
        alert("I'm afraid I can't let you talk to yourself. That would be weird.");
        return;
      }
  
      // Record the username being called for future reference
  
      window.targetUsername = clickedUsername;
      console.log("Inviting user " + window.targetUsername);
  
      // Call createPeerConnection() to create the RTCPeerConnection.
      // When this returns, window.myPeerConnection is our RTCPeerConnection
      // and webcamStream is a stream coming from the camera. They are
      // not linked together in any way yet.
  
      console.log("Setting up connection to invite user: " + targetUsername);
      window.createPeerConnection();
  
      // Get access to the webcam stream and attach it to the
      // "preview" box (id "local_video").
  
      try {
        webcamStream = await navigator.mediaDevices.getUserMedia(window.mediaConstraints);
        document.querySelector(".local_video").srcObject = webcamStream;
      } catch(err) {
        window.handleGetUserMediaError(err)
        return;
      }
  
      // Add the tracks from the stream to the RTCPeerConnection
  
      try {
        webcamStream.getTracks().forEach(
          transceiver = track => window.myPeerConnection.addTransceiver(track, {streams: [webcamStream]})
        );
      } catch(err) {
        window.handleGetUserMediaError(err)
      }
    }
  }
  function createWs() {
    socket = new WebSocket('ws://127.0.0.1:8080')
    socket.addEventListener('message', function (message) {
      // 处理各种类型的响应
      handle(JSON.parse(message.data))
    })
    window.sendToServer = (msg) => {
      socket.send(JSON.stringify(msg))
    }
  }
  createWs()
})()