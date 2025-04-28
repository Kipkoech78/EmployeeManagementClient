const baseURL = import.meta.env.VITE_API_BASE_URL;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState ={
    isLoading: false,
    employeeList :[],
    employeeDetails:null
}
export const addEmployee = createAsyncThunk('/admin/addemployee',
    async(formData) =>{
        const result = await axios.post(`${baseURL}/api/employee/add`, formData,{
            headers:{
                 'Content-Type': "application/json"
            }
        } )
        return result?.data
    }
)
export const fetchEmployee = createAsyncThunk('/admin/fetchEmployee',
    async(formData) =>{
        const result = await axios.get(`${baseURL}/api/employee/get-all`, formData,{
            headers:{
                 'Content-Type': "application/json"
            }
        } )
        return result?.data
    }
)

export const editEmployee = createAsyncThunk('/products/editEmployee',
    async ({id, formData}) =>{
        const result = await axios.put(`${baseURL}/api/employee/edit/${id}`, formData,{
            headers:{
                'Content-Type': "application/json"
            }
        })
        console.log(result, "result in asyncthunk")
        return result?.data
    }
)
export const deleteEmployee = createAsyncThunk('/products/deleteEmployee',
    async (id) =>{
        const result = await axios.delete(`${baseURL}/api/employee/delete/${id}` , {
            headers:{
                'Content-Type': "application/json"
            }
        })
        return result?.data

    }
)

const AdminemployeeSlice = createSlice({
    name:'employeeSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchEmployee.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchEmployee.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.employeeList = action.payload.data;
        })
        .addCase(fetchEmployee.rejected, (state)=>{
            state.isLoading = false;
            state.employeeList =[]
        })
    }

});


export default AdminemployeeSlice.reducer;