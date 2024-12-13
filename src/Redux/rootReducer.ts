import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import personalInfoSlice from './personalInfoSlice';
import planAndAddOnsSlice from './PlanAndAddOnSlice';

const rootReducer = combineReducers({
    personalInfo:personalInfoSlice,
    sidebar: sidebarReducer,
    planAndAddOns:planAndAddOnsSlice 
})

export default rootReducer
