import { createSlice } from '@reduxjs/toolkit'


const localStorageTasks = JSON.parse(localStorage.getItem('tasks_789'));


const initialState = localStorageTasks || {'456': {name:'Explore this App', 
                                                    id:'456',
                                                    description:'Have a look around this app and explore all the functionality.', 
                                                    columnId:'127', 
                                                    boardColumnIds:['127', '128', '129'], 
                                                    subTasks:[{name: 'create your first own board', id:'321', status: 'open'},
                                                                {name: 'try to hide the nav', id:'322', status: 'open'},
                                                                {name: 'try the dark mode', id:'323', status: 'open'},
                                                                {name: 'try to delete or shift a task', id:'323', status: 'open'},
                                                                {name: 'try to reload the page', id:'324', status: 'open'}]}};


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
                // preventing to duplicates
            if (!tasks[taskId].boardColumnIds.includes(columnId)) {
                tasks[taskId].boardColumnIds.push(columnId);
            }
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