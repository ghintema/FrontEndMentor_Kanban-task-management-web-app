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
        },
        toggleNavVisibility(options, action) {
            options.navVisibility = !options.navVisibility;
        },
        toggleLightMode(options, action) {
            options.lightMode = !options.lightMode;
        }
    }
})

export const selectOptions = (state) => {
    return state.options;
}

export const selectNightMode = (state) => {
    return state.options.nightMode;
}

export const selectNavVisibility = (state) => {
    return state.options.navVisibility;
}
// maybe its better to have toggler-actions instead of setter-actions.
export const { setLightMode, setNavVisibility, toggleNavVisibility, toggleLightMode } = optionsSlice.actions
export default optionsSlice.reducer;