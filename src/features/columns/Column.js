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
                <h2>{allColumns[id].name}</h2>
                <ul>
                    {columnIsEmpty ? <li>No tasks</li> :
                        cardIdsOfTheColumn.map(id => <li key={id + 1}><Card id={id} key={id + 2} /></li>)
                    }
                </ul>
            </div>
        
     );
}

export {Column};


{/* <ul>
                        cardIdsOfTheColumn.map(id => <li key={id + 1}><Card id={id} key={id + 2} /></li>)
                    </ul> */}