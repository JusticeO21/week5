import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PersonalInfoState = {
    name: string;
    mail: string;
    phone: string;
}

type PayLoadActionState = {
    [key:string]:string
}

const initialState: PersonalInfoState = {
    name: "",
    mail: "",
    phone: ""
};

const personalInfoSlice = createSlice({
    name: "personalIfo",
    initialState,
    reducers: ({
        updatePersonalInfo: (state, action: PayloadAction<PayLoadActionState>) => { 
            return {
                ...state,
                ...action.payload
            }
            
        },
    })
});

export const { updatePersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer
