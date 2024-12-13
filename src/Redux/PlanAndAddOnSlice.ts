import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type planAndAddOnsState = {
    plan? : {
      name: string,
      cost: number
    }

    addOns?: {
        [key : string] : number
    }

    total: number;
    isAYearPlan: boolean;
}

const initialState:planAndAddOnsState = {
    plan: undefined,
    addOns: undefined,
    total: 0,
    isAYearPlan: false
}

const planAndAddOnsSlice = createSlice({
    name: "planAndAddOns",
    initialState,
    reducers: ({
        updatePlan: (state, action: PayloadAction<{name: string,
      cost: number}>) => {
            state.plan = action.payload 
            state.total += action.payload.cost
        },

        updateAddOns: (state, action: PayloadAction<{[key:string] : number}>) => {
            state.addOns = {
                ...state.addOns,
                ...action.payload
            }
            
            state.total += Object.values(action.payload)[0];
        },

        removeAddOn: (state, action: PayloadAction<string>) => {
            state.total -= state.addOns?.[`${action.payload}`] || 0
            delete state.addOns?.[`${action.payload}`]
        },

        updatePlanDuration: (state) => {
            state.isAYearPlan = !state.isAYearPlan
        }
                    
    })
    
})


const { updatePlan, updateAddOns, removeAddOn, updatePlanDuration } = planAndAddOnsSlice.actions;
export {
    updateAddOns, updatePlan, removeAddOn, updatePlanDuration
}

export default planAndAddOnsSlice.reducer;
