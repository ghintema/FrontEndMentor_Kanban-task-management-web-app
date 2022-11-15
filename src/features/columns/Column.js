import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectColumns } from './columnsSlice'
import { selectOptions } from '../options/optionsSlice';
import  { allColorSchemes }  from '../../colorScheme';
import { Task } from '../tasks/Task.js';

function Column(props) {
    
    const id = props.id
    const allColumns = useSelector(selectColumns);
    const options = useSelector(selectOptions);
    const taskIdsOfTheColumn = allColumns[id].taskIds;
    const columnIsEmpty = taskIdsOfTheColumn.length === 0;
    
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

    return ( 
        
            <div className='columnContainer'> 
                <h4>{allColumns[id].name}</h4>
                <ul>
                    {
                        taskIdsOfTheColumn.map(id => <li key={id + 1}><Task id={id} key={id + 2} /></li>)
                    }
                </ul>
            </div>
        
     );
}

export {Column};


{/* <ul>
                        taskIdsOfTheColumn.map(id => <li key={id + 1}><Task id={id} key={id + 2} /></li>)
                    </ul> */}