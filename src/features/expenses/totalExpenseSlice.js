import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const fetchTotalExpense = createAsyncThunk(
    'expenses/fetchTotalExpense',
    async ({startDate,endDate,inCharge})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}`;
        try{
            const response = await Axios.get(
                `${BASE_URL}/expenses/total${urlParam}`,
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


const totalExpenseSlice = createSlice({
    name: "totalExpense",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTotalExpense.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchTotalExpense.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchTotalExpense.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default totalExpenseSlice.reducer