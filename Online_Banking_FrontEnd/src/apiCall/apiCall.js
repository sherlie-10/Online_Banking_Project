import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const apiCall = createAsyncThunk("OnlineBankAppln", async ()=>{
    
    const res = await axios.get("http://localhost:9090/api/users")
    return res
});

export default apiCall;