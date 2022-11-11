import { createSlice } from '@reduxjs/toolkit'

const initialState = {'123': {name:'task name', 
                              id:'123',
                              description:'This is to be done', 
                              columnId:'', 
                              boardColumnIds:[''], 
                              subTasks:{'321': 
                                {name: 'sub task', 
                                 id:'321', 
                                 status: 'open'}}}};


// every task has exactly and always ONE columnId (the one it is sittin on) but can have zero to whatever columnIds, wich are potential new target-columns insige the board. This is important as selection-options for a column change.

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTaskToTasks(tasks, action) { // expects a complete task-object as payload
            const newTaskId = action.payload.id;
            tasks[newTaskId] = action.payload;
        },
        removeTaskFromTasks(tasks, action) { // expects a string with id to be deleted
            const taskId = action.payload
            delete tasks[taskId] // 'delete' removes single keys in an entire object.
        },
        addBoardColumnIdToTask(tasks, action) { 
            const [ taskId, columnId ] = action.payload;
            tasks[taskId].boardColumnIds.push(columnId);
        },
        removeBoardColumnIdFromTask(tasks, action) {
            const [ taskId, columnId ] = action.payload;
            tasks[taskId].boardColumnIds = tasks[taskId].boardColumnIds.filter(id => id !== columnId )
        },
        setColumnIdForTask(tasks, action) { // expects two strings in the payload, representing id and columnId 
            const [ taskId, columnId ] = action.payload;
            tasks[taskId].columnId = columnId;   
        },
        addSubTaskToTask(tasks, action) {
            const [ taskId, subTask ] = action.payload;
            tasks[taskId].subTask.push(subTask);
        },
        removeSubTaskFromTask(tasks, action) {
            const [ taskId, subTaskId ] = action.payload;
            delete tasks[taskId].subTask[subTaskId];
        }
    }
})


export const selectTasks = (state) => {
    return state.tasks;
}

export const {  addTaskToTasks, 
                removeTaskFromTasks, 
                addBoardColumnIdToTask, 
                removeBoardColumnIdFromTask, 
                addSubTaskToTask,
                removeSubTaskFromTask,
                setColumnIdForTask } = tasksSlice.actions;
export default tasksSlice.reducer;