import { Msg, User } from './server.d'

export function handler(msg: Msg, userList: User, currentConn: any) {
  let msgString

  switch(msg.type) {
    case 'login':
      if(userList[msg.data] || !msg.data) {
        msgString = JSON.stringify({
          type: msg.type,
          data: false,
          msg: `name: ${msg.data} already exis`
        })
        currentConn.send(msgString)
      } else {
        userList[msg.data] = {
          name: msg.data,
          connenction: currentConn
        }
        sendUserListToAll(userList)
      }
      break;
    case 'connection':
      break;
    case 'disconnect':
      break;
    default: // new-ice-candidate, video-offer, video-answer
      msgString = JSON.stringify(msg);
      // target is username, 
      sendToOneUser(userList, msg.target!, msgString);
      break;
  }
}

// Sends a "userlist" message to all chat members. This is a cheesy way
// to ensure that every join/drop is reflected everywhere. It would be more
// efficient to send simple join/drop messages to each user, but this is
// good enough for this simple example.
function sendUserListToAll(userList: User) {
  let userListMsg = makeUserListMessage(userList)
  let userListMsgStr = JSON.stringify(userListMsg)

  Object.keys(userList).forEach(key => {
    userList[key].connenction.send(userListMsgStr)
  })
}

// Sends a message (which is already stringified JSON) to a single
// user, given their username. We use this for the WebRTC signaling,
// and we could use it for private text messaging.
function sendToOneUser(userList: User, target: string, msgString: string) {
  userList[target].connenction.send(msgString)
}

// Builds a message object of type "userlist" which contains the names of
// all connected users. Used to ramp up newly logged-in users and,
// inefficiently, to handle name change notifications.
function makeUserListMessage(userList: User) {
  let userListMsg: Msg = {
    type: "userlist",
    users: [],
    data: ''
  }

  Object.keys(userList).forEach(key => {
    userListMsg.users!.push(key)
  })

  return userListMsg;
}