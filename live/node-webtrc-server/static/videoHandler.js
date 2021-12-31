let webcamStream

// 关闭视频
window.closeVideoCall = () => {
  var localVideo = document.querySelector(".local_video");

  console.log("Closing the call");

  // Close the RTCPeerConnection

  if (window.myPeerConnection) {
    console.log("--> Closing the peer connection");

    // Disconnect all our event listeners; we don't want stray events
    // to interfere with the hangup while it's ongoing.

    window.myPeerConnection.ontrack = null;
    window.myPeerConnection.onnicecandidate = null;
    window.myPeerConnection.oniceconnectionstatechange = null;
    window.myPeerConnection.onsignalingstatechange = null;
    window.myPeerConnection.onicegatheringstatechange = null;
    window.myPeerConnection.onnotificationneeded = null;

    // Stop all transceivers on the connection

    window.myPeerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

    // Stop the webcam preview as well by pausing the <video>
    // element, then stopping each of the getUserMedia() tracks
    // on it.

    if (localVideo.srcObject) {
      localVideo.pause();
      localVideo.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    }

    // Close the peer connection

    window.myPeerConnection.close();
    window.myPeerConnection = null;
    webcamStream = null;
  }

  // Disable the hangup button

  // document.getElementById("hangup-button").disabled = true;
  targetUsername = null;
}

// 处理视频异常
window.handleGetUserMediaError = (e) => {
  switch(e.name) {
    case "NotFoundError":
      alert("Unable to open your call because no camera and/or microphone" +
            "were found.");
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert("Error opening your camera and/or microphone: " + e.message);
      break;
  }

  window.closeVideoCall()
}

// 接收通信offer
window.handleVideoOfferMsg = async(msg) => {
  targetUsername = msg.name;

  // If we're not already connected, create an RTCPeerConnection
  // to be linked to the caller.

  console.log("Received video chat offer from " + targetUsername);
  if (!window.myPeerConnection) {
    window.createPeerConnection();
  }

  // We need to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.

  var desc = new RTCSessionDescription(msg.sdp);

  // If the connection isn't stable yet, wait for it...

  if (window.myPeerConnection.signalingState != "stable") {
    console.log("  - But the signaling state isn't stable, so triggering rollback");

    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      window.myPeerConnection.setLocalDescription({type: "rollback"}),
      window.myPeerConnection.setRemoteDescription(desc)
    ]);
    return;
  } else {
    console.log ("  - Setting remote description");
    await window.myPeerConnection.setRemoteDescription(desc);
  }

  // Get the webcam stream if we don't already have it

  if (!webcamStream) {
    try {
      webcamStream = await navigator.mediaDevices.getUserMedia(window.mediaConstraints);
    } catch(err) {
      window.handleGetUserMediaError(err);
      return;
    }

    document.querySelector(".local_video").srcObject = webcamStream;

    // Add the camera stream to the RTCPeerConnection

    try {
      webcamStream.getTracks().forEach(
        transceiver = track => window.myPeerConnection.addTransceiver(track, {streams: [webcamStream]})
      );
    } catch(err) {
      window.handleGetUserMediaError(err);
    }
  }

  console.log("---> Creating and sending answer to caller");

  await window.myPeerConnection.setLocalDescription(await window.myPeerConnection.createAnswer());

  sendToServer({
    name: window.myUsername,
    target: targetUsername,
    type: "video-answer",
    sdp: window.myPeerConnection.localDescription
  });
}

window.handleVideoAnswerMsg = async(msg) => {
  console.log("*** Call recipient has accepted our call");

  // Configure the remote description, which is the SDP payload
  // in our "video-answer" message.

  var desc = new RTCSessionDescription(msg.sdp);
  await window.myPeerConnection.setRemoteDescription(desc).catch(reportError);
}