import { createSlice } from "@reduxjs/toolkit";

const initialHomeState = {topRidingTools: []};

const homePageSlice = createSlice({
    name: 'homePage',
    initialState: initialHomeState,
    reducers:{
        setTopRidingTool(state, action) {
            state.topRidingTools = action.payload;
        }
    }
})

export const homePageAction = homePageSlice.actions;
export default homePageSlice;