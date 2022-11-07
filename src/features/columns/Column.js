import React from 'react'
import { useSelector } from 'react-redux';
import columnsSlice from './columnsSlice';
import { selectColumns } from './columnsSlice'
import { Card } from '../cards/Card.js';

function Column({ id }) {

    const allColumns = useSelector(selectColumns);
    const cardsToBeRendered = allColumns[id].cardIds;

    return ( 
        <div className='columnContainer'>
            {/* cardsToBeRendered.map(card => return <Card id={card.id} key={card.id} />) */}
        </div>
     );
}

export {Column};