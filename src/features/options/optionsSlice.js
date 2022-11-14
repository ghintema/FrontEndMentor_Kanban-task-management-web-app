import { createSlice } from "@reduxjs/toolkit";

const initialState = {  nightMode: false, 
                        navVisibility: true, 
                        subMenuBoardVisiblity: false, 
                        subMenuTaskVisiblity: false,};

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
        setSubMenuVisibility(options, action) {
            options.subMenuBoardVisiblity = action.payload;
            options.subMenuTaskVisiblity = action.payload;
        },
        setSubMenuBoardVisibility(options, action) {
            options.subMenuBoardVisiblity = action.payload;
        },
        setSubMenuTaskVisibility(options, action) {
            options.subMenuTaskVisiblity = action.payload;
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
export const {  setLightMode, 
                setNavVisibility,
                setSubMenuVisibility,
                setSubMenuBoardVisibility,
                setSubMenuTaskVisibility, 
                toggleNavVisibility, 
                toggleLightMode } = optionsSlice.actions
export default optionsSlice.reducer;