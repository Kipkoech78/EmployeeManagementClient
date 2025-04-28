import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../store/authSlice/index'

const store = configureStore({
    reducer:{
        auth: authReducer,
    }
       
    
})

export default store;