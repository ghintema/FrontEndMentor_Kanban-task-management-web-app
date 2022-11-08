import React from 'react'
import { useSelector } from 'react-redux';
import columnsSlice from './columnsSlice';
import { selectColumns } from './columnsSlice'
import { Card } from '../cards/Card.js';

function Column(props) {
    
    const id = props.id
    const allColumns = useSelector(selectColumns);
    console.log(id)
    console.log(allColumns[id])
    // const cardsToBeRendered = allColumns[id].cardIds;

    // const columnIsEmpty = cardsToBeRendered.length === 0;

    return ( 
        
            <div className='columnContainer'> 
                {/* {columnIsEmpty ? <p>no tasks on this column</p> :
                    cardsToBeRendered.map(card => <Card id={card.id} key={card.id} />)
                } */}
            </div>
        
     );
}

export {Column};