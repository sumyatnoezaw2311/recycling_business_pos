import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const fetchTotalWage = createAsyncThunk(
    'wages/fetchTotalWage',
    async({startDate,endDate,inCharge,person})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${person && `employer=${person}`}
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}`
        try{
            const response = await Axios.get(`${BASE_URL}/wages/total${urlParam}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            return data
        }catch(error){
            throw new Error(error)
        }
    }
)


const totalWageSlice = createSlice({
    name: "totalWage",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTotalWage.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchTotalWage.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchTotalWage.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default totalWageSlice.reducer