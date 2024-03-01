import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from "../../component/utils/ShowToast";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async({contactType,name,pageNo})=>{
        let urlParam = `&${name && `name=${name}`}&${pageNo && `page=${pageNo}`}`;
        try{
            const response = await Axios.get(`${BASE_URL}/contacts?type=${contactType}${urlParam}`,
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

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchContacts.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchContacts.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchContacts.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default contactsSlice.reducer