import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string; 
  uid: number; 
  avatar: string; 
  token: string; 
}
type UserInfo = User | Partial<User>

// action
const setUser = createAction<User>('user/setUser')
const emptyUser = createAction<Partial<User>>('user/emptyUser')
// initial user
const userState:UserInfo = {}

// reducer
const userReducer = createReducer(userState, (builder) => {
  builder
  .addCase(setUser, (state, action) => {
    state = action.payload
  })
  .addCase(emptyUser, (state, action) => {
    state = {}
  })
})

export default userReducer