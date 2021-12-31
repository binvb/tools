export interface Msg {
  data: string
  type: 'login' | 'connection' | 'disconnect' | 'new-ice-candidate' | 'userlist' | 'video-offer' | 'video-answer'
  target?: string // username
  candidate?: string
  users?: string[] 
}

interface UserInfo {
  connenction: any
  name: string
}

export interface User {
  [key: string]: UserInfo
}