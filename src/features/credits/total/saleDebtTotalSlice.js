import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../../config/config";


export const fetchSaleDebtTotal = createAsyncThunk(
    'credit/fetchSaleDebtTotal',
    async({startDate,endDate,inCharge,person})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${person && `customer=${person}`}
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}`
        try{
            const response = await Axios.get(`${BASE_URL}/sales/debt-total${urlParam}`,
                {
                    headers: HEADERS()
                }
            )
            return response.data
        }catch(error){
            throw new Error(error)
        }
    }
)

const saleDebtTotalSlice = createSlice({
    name: "saleDebtTotal",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSaleDebtTotal.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchSaleDebtTotal.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchSaleDebtTotal.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default saleDebtTotalSlice.reducer