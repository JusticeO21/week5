import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState{
    step: number;
}

const initialState: SidebarState = {
    step: 1,
}

export const navbarSlice = createSlice({
    name:"navbar",
    initialState,
    reducers: ({
        goToNextStep: (state) => {
            if (state.step < 4) {
                state.step++
            }
        },

        goBack: (state) => {
            if (state.step > 1) {
                state.step--
            }
        },

        updateStep: (state, action:PayloadAction<Pick<SidebarState, 'step'>>) => {
            state.step = action.payload.step;
        },

        reset:()=> {return initialState}

    })
})

export const { goToNextStep, goBack, updateStep, reset } = navbarSlice.actions;
export default navbarSlice.reducer;
