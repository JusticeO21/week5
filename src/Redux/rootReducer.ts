import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import personalInfoSlice from './personalInfoSlice';



const rootReducer = combineReducers({
    personalInfo:personalInfoSlice,
    sidebar: sidebarReducer,
    
})

export default rootReducer
