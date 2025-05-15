import locationReducer from "./slices/routeLocationSlice";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        location: locationReducer
    }
})

export default store