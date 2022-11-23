import { createSlice } from "@reduxjs/toolkit";

const localStorageOption = JSON.parse(localStorage.getItem('options_1234'))


const initialState = localStorageOption || {nightMode: false, 
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
        toggleNightMode(options, action) {
            options.nightMode = !options.nightMode;
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
                toggleNightMode } = optionsSlice.actions
export default optionsSlice.reducer;