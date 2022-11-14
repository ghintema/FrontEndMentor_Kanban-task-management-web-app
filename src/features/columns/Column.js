import React from 'react'
import { useSelector } from 'react-redux';
import columnsSlice from './columnsSlice';
import { selectColumns } from './columnsSlice'
import { Task } from '../tasks/Task.js';

function Column(props) {
    
    const id = props.id
    const allColumns = useSelector(selectColumns);
    const taskIdsOfTheColumn = allColumns[id].taskIds;
    const columnIsEmpty = taskIdsOfTheColumn.length === 0;
    

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