import { createSlice } from '@reduxjs/toolkit';

const initialState = {'456': {name:'column headline', id:'456', cardIds: []}}

// cardIds carrys all cards currently shown in this columns

export const columnsSlice = createSlice({
    name:'columns',
    initialState: initialState,
    reducers: {
        addColumnToColumns(columns, action) {
            const newColumnId = action.payload.id;
            columns[newColumnId] = action.payload;
        },
        removeColumnFromColumns(columns, action) {
            const columnIdToDelete = action.payload;
            delete columns[columnIdToDelete]
        },
        addCardIdToColumn(columns, action) {
            const [ columnId, cardId ] = action.payload;
            columns[columnId].cardIds.push(cardId)
        },
        removeCardIdFromColumn(columns, action) {
            const [ columnId, cardId ] = action.payload;
            columns[columnId].cardIds = columns[columnId].cardIds.filter(id => id !== cardId )
        },
        setColumnName(columns, action) {
            const [ columnId, newName ] = action.payload;
            columns[columnId].name = newName;
        }
    }
});

export const selectColumns = (state) => {
    return state.columns;
}

export const {  addColumnToColumns,
                removeColumnFromColumns,
                addCardIdToColumn,
                removeCardIdFromColumn,
                setColumnName } = columnsSlice.actions;
export default columnsSlice.reducer;