import React from 'react';
import ReactDOM from 'react-dom'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTasks } from './tasksSlice';


function Task ( props ) {

    const taskId = props.id;
    const location = useLocation()
    const boardId = location.pathname;
    const allTasks = useSelector(selectTasks);
    const taskToBeRendered = allTasks[taskId];

    const subTasksTotal = taskToBeRendered.subTasks.length;
    const subTasksDone = taskToBeRendered.subTasks.filter(subTask => subTask.status === 'done').length;
    // const subTasksDone = Object.values(taskToBeRendered.subTasks).find(subTask => subTask.status === 'done')


    return ( 
        <Link to={boardId + '/' + taskId + '/ShowTask'} style={{textDecoration: 'none'}}>
            <div className='taskContainer'>
                <h3>{taskToBeRendered.name}</h3>
                <p>{subTasksDone} of {subTasksTotal} subtasks</p>
            </div>
        </Link>

     );
}

export {Task} ;