import React from 'react'
import { useSelector } from 'react-redux';
import columnsSlice from './columnsSlice';
import { selectColumns } from './columnsSlice'
import { Card } from '../cards/Card.js';

function Column(props) {
    
    const id = props.id
    console.log(`Column id: ${id}`)
    const allColumns = useSelector(selectColumns);
    const cardIdsOfTheColumn = allColumns[id].cardIds;
    const columnIsEmpty = cardIdsOfTheColumn.length === 0;
    
    console.log(cardIdsOfTheColumn)

    return ( 
        
            <div className='columnContainer'> 
                <h3>{allColumns[id].name}</h3>
                {columnIsEmpty ? <p>No tasks on this column</p> :
                    cardIdsOfTheColumn.map(id => <Card id={id} key={id} />)
                }
            </div>
        
     );
}

export {Column};