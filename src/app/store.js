import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import boardsSlice  from "../features/boards/boardsSlice";
import tasksSlice from "../features/tasks/tasksSlice";
import columnsSlice from "../features/columns/columnsSlice";
import optionsSlice from "../features/options/optionsSlice";

export const store = configureStore({
    reducer: {
        boards: boardsSlice,
        columns: columnsSlice,
        tasks: tasksSlice,
        options: optionsSlice,
    },
})



// const rootReducer = combineReducers({
//     boards: boardsSlice,
//     columns: columnsSlice,
//     tasks: tasksSlice,
//     options: optionsSlice,
// })

// export const store = createStore(
//     rootReducer,
//     compose(
//       applyMiddleware(thunk),
//       window.devToolsExtension ? window.devToolsExtension() : f => f
//     )
//   );
