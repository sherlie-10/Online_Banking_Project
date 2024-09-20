// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const apiCall = createAsyncThunk("OnlineBankAppln/login", async ({username, password})=>{
    
//     const response = await axios.post("http://localhost:9090/api/login",{username,password});
//     console.log("Login API response: ", response); 
//     const {data} = response;
//     const {x} = data;
//     const {token} = x;
//     return token;

    
// });

// export default apiCall;



import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiCall = createAsyncThunk("OnlineBankAppln/login", async ({ username, password }) => {
  try {
    const response = await axios.post("http://localhost:9090/api/login", { username, password });
    console.log("Login API response: ", response); 
    
    const { data } = response;
    const { token } = data; // Directly destructure the token from the data
    
    if (!token) {
      throw new Error("Token not found in the response.");
    }
    
    return token;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // This will handle errors and trigger the rejection in the thunk
  }
});

export default apiCall;
