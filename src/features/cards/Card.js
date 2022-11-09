import React from 'react';
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux';
import { selectCards } from './cardsSlice';


function Card ( props ) {

    const id = props.id;

    console.log(`Card id: ${id}`)
    const allCards = useSelector(selectCards);
    const cardToBeRendered = allCards[id];
    console.log(allCards)
    console.log(cardToBeRendered.subTasks)

    const subTasksTotal = cardToBeRendered.subTasks.length;
    const subTasksDone = cardToBeRendered.subTasks.filter(subTask => subTask.status === 'done').length;
    // const subTasksDone = Object.values(cardToBeRendered.subTasks).find(subTask => subTask.status === 'done')


    return ( 
        <div className='cardContainer'>
            <h3>{cardToBeRendered.name}</h3>
            <p>{subTasksDone} out of {subTasksTotal} subtasks</p>
        </div>
     );
}

export {Card} ;