import apiCall from "../apiCall/apiCall";
import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name : "Online Banking Appln",
    initialState : {
        isLoading : false,
        result : {},
        error : false
    },

    extraReducers : (builder)=>{
        builder.addCase(apiCall.pending, (state,action)=>{
            state.isLoading  = false;
            state.result = {};
            state.error = false
        })
        builder.addCase(apiCall.fulfilled,(state,action)=>{
            state.isLoading = true;
            state.result = action.payload;   //Save the jwt token here
            state.error = false
        })

        builder.addCase(apiCall.rejected,(state,action)=>{
            state.isLoading = false;
            state.result = {};
            state.error = true
        })
    }
})

export default slice.reducer;