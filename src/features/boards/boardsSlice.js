import { createSlice } from '@reduxjs/toolkit';

const localStorageBoards = JSON.parse(localStorage.getItem('boards_123'));

// const localStorageBoards = false; 
const initialState = localStorageBoards || {'123': {name:'Example Board', id:'123', columnIds: ['127', '128', '129']}};

export const boardsSlice = createSlice({
    name: 'boards',
    initialState: initialState,
    reducers: {
        addBoardToBoards(boards, action) {
            const newBoardId = action.payload.id;
            boards[newBoardId] = action.payload;
            // const copy = {...boards};
            // const newBoards = {...copy, newBoardId: action.payload}
            // boards = newBoards;
        },
        removeBoardFromBoards(boards, action) {
            const boardIdToDelete = action.payload;
            delete boards[boardIdToDelete];
        },
        addColumnToBoard(boards, action) {
            const [ boardId, columnId ] = action.payload;
            boards[boardId].columnIds.push(columnId);
        },
        removeColumnFromBoard(boards, action) {
            const [ boardId, columnId ] = action.payload;
            boards[boardId].columnIds = boards[boardId].columnIds.filter(id => id !== columnId )
        }
    }
})

export const selectBoards = (state) => {
    return state.boards;
}

export const {  addBoardToBoards,
                removeBoardFromBoards,
                addColumnToBoard,
                removeColumnFromBoard } = boardsSlice.actions;
export default boardsSlice.reducer;