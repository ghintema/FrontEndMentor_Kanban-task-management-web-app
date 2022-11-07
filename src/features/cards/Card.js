import React from 'react';
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux';
import { selectCards } from './cardsSlice';


function Card ( { id } ) {

    const allCards = useSelector(selectCards);
    const cardToBeRendered = allCards[id];

    const subTasksTotal = cardToBeRendered.subTasks.length;
    const subTasksDone = Object.values(cardToBeRendered.subTasks).find(subTask => subTask.status === 'done')


    return ( 
        <div className='cardContainer'>
            <h3>{cardToBeRendered.title}</h3>
            <p>`${subTasksDone} out of ${subTasksTotal} subtasks`</p>
        </div>
     );
}

export {Card} ;