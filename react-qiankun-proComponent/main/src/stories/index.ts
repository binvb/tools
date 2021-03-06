import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.store'

const store = configureStore({reducer: userReducer})

export default store