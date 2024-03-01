import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../../config/config";


export const fetchPurchaseCreditTotal = createAsyncThunk(
    'credit/fetchPurchaseCreditTotal',
    async({startDate,endDate,inCharge,person})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${person && `merchant=${person}`}
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}`
        try{
            const response = await Axios.get(`${BASE_URL}/purchases/credit-total${urlParam}`,
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

const purchaseCreditTotalSlice = createSlice({
    name: "purchaseCreditTotal",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPurchaseCreditTotal.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchPurchaseCreditTotal.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchPurchaseCreditTotal.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default purchaseCreditTotalSlice.reducer