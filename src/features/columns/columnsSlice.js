import { createSlice } from '@reduxjs/toolkit';

const initialState = {'127': {name:'ToDo', id:'127', taskIds: ['456']},
                      '128': {name:'Doing', id:'128', taskIds: []},
                      '129': {name:'Done', id:'129', taskIds: []}}

// taskIds carrys all tasks currently shown in this columns

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
        addTaskIdToColumn(columns, action) {
            const [ columnId, taskId ] = action.payload;
                // preventing to duplicates
            if (!columns[columnId].taskIds.includes(taskId)) {
                columns[columnId].taskIds.push(taskId);
            }
        },
        removeTaskIdFromColumn(columns, action) {
            const [ columnId, taskId ] = action.payload;
            columns[columnId].taskIds = columns[columnId].taskIds.filter(id => id != taskId )
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
                addTaskIdToColumn,
                removeTaskIdFromColumn,
                setColumnName } = columnsSlice.actions;
export default columnsSlice.reducer;