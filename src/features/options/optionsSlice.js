import { createSlice } from "@reduxjs/toolkit";

const initialState = {nightMode: false, navVisibility: true};

export const optionsSlice = createSlice({
    name: 'options',
    initialState: initialState,
    reducers: {
        setLightMode(options, action) {
            options.lightMode = action.payload;
        },
        setNavVisibility(options, action) {
            options.navVisibility = action.payload;
        }
    }
})

export const selectNightMode = (state) => {
    return state.options.nightMode;
}

export const selectNavVisibility = (state) => {
    return state.options.navVisibility;
}
// maybe its better to have toggler-actions instead of setter-actions.
export const { setLightMode, setNavVisibility } = optionsSlice.actions
export default optionsSlice.reducer;