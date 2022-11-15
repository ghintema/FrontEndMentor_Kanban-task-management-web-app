import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTasks } from './tasksSlice';
import { selectOptions } from '../options/optionsSlice';
import  { allColorSchemes }  from '../../colorScheme';


function Task ( props ) {

    const taskId = props.id;
    const location = useLocation();
    const boardId = location.pathname;
    const allTasks = useSelector(selectTasks);
    const options = useSelector(selectOptions);
    const [ colorScheme, setColorScheme ] = useState({});

    useEffect(() => {

        if (options.nightMode) {
            setColorScheme({'main':             allColorSchemes.main.nightMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.nightMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.nightMode});
        } else if (!options.nightMode) {
            setColorScheme({'main':             allColorSchemes.main.dayMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.dayMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.dayMode});
        }

    },[options.nightMode])


    const subTasksTotal = allTasks[taskId].subTasks.length;
    const subTasksDone = allTasks[taskId].subTasks.filter(subTask => subTask.status === 'done').length;

    return ( 
        <Link to={boardId + '/' + taskId + '/ShowTask'} style={{textDecoration: 'none'}}>
            <div className='taskContainer' style={colorScheme.main}>
                <h3 style={colorScheme.main}>{allTasks[taskId].name}</h3>
                <p>{subTasksDone} of {subTasksTotal} subtasks</p>
            </div>
        </Link>

     );
}

export {Task} ;