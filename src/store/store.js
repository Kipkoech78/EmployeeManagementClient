import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../store/authSlice/index'
import AdminemployeeSlice from '../store/admin/employee-slice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        employeeData: AdminemployeeSlice
    }
})

export default store;