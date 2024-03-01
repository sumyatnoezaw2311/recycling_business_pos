import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from "../../component/utils/ShowToast";

export const fetchDailyFinishedItems = createAsyncThunk(
    'finished/fetchDailyFinishedItems',
    async({startDate,endDate,inCharge,itemId,pageNo})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${itemId && `item_id=${itemId}`}
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}
        &${pageNo && `page=${pageNo}`}`;
        try{
            const response = await Axios.get(`${BASE_URL}/finished${urlParam}`,
                {
                    headers: HEADERS()
                }
            )
            return response.data
        }catch(error){
            if(error.response.status === 401){
                ShowToast('error','ကျေးဇူးပြု၍လော့အင်ပြန်ဝင်ပါ')
                localStorage.removeItem('recycleAppAuth')
            }else{
                ShowToast('error','မှားယွင်းနေပါသည်')
            }
            throw new Error(error)
        }
    }
)

const dailyFinishedItemsSlice = createSlice({
    name: "dailyFinishedItems",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchDailyFinishedItems.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchDailyFinishedItems.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchDailyFinishedItems.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default dailyFinishedItemsSlice.reducer