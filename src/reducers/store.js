import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './apiSlice';




const store = configureStore({
    reducer: {
        blog: blogReducer
    }
});
export default store;