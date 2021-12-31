window.conncetionHandler = {
  handleICECandidateEvent: (event) => {
    if (event.candidate) {
     console.log("*** Outgoing ICE candidate: " + event.candidate.candidate);
  
      window.sendToServer({
        type: "new-ice-candidate",
        target: window.targetUsername,
        candidate: event.candidate
      });
    }
  },
  handleICEConnectionStateChangeEvent: () => {
   console.log("*** ICE connection state changed to " + window.myPeerConnection.iceConnectionState);

    switch(window.myPeerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        window.closeVideoCall()
        break;
    }
  },
  handleSignalingStateChangeEvent: () => {
   console.log("*** WebRTC signaling state changed to: " + myPeerConnection.signalingState);
    switch(myPeerConnection.signalingState) {
      case "closed":
        window.closeVideoCall()
        break;
    }
  },
  handleNegotiationNeededEvent: async () => {
   console.log("*** Negotiation needed");

    try {
     console.log("---> Creating offer");
      const offer = await window.myPeerConnection.createOffer();
  
      // If the connection hasn't yet achieved the "stable" state,
      // return to the caller. Another negotiationneeded event
      // will be fired when the state stabilizes.
  
      if (window.myPeerConnection.signalingState != "stable") {
       console.log("     -- The connection isn't stable yet; postponing...")
        return;
      }
  
      // Establish the offer as the local peer's current
      // description.
  
     console.log("---> Setting local description to the offer");
      await window.myPeerConnection.setLocalDescription(offer);
  
      // Send the offer to the remote peer.
  
     console.log("---> Sending the offer to the remote peer");
      window.sendToServer({
        name: window.myUserName,
        target: window.targetUsername,
        type: "video-offer",
        sdp: window.myPeerConnection.localDescription
      })
    } catch(err) {
     console.log("*** The following error occurred while handling the negotiationneeded event:");
      reportError(err);
    };
  },
  handleTrackEvent: (event) => {
   console.log("*** Track event");
    document.querySelector(".received_video").srcObject = event.streams[0];
  }
}