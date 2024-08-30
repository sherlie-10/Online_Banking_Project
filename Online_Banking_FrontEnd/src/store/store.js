import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "../slice/slice";

const store = configureStore({
    reducer : {
        "Online Banking Appln" : sliceReducer
    }
});

export default store