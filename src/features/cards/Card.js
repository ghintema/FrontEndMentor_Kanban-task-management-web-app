import React from 'react';
import ReactDOM from 'react-dom'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCards } from './cardsSlice';


function Card ( props ) {

    const cardId = props.id;
    const location = useLocation()
    console.log(location)
    const boardId = location.pathname;
    const allCards = useSelector(selectCards);
    const cardToBeRendered = allCards[cardId];
    console.log(allCards)
    console.log(cardToBeRendered.subTasks)

    const subTasksTotal = cardToBeRendered.subTasks.length;
    const subTasksDone = cardToBeRendered.subTasks.filter(subTask => subTask.status === 'done').length;
    // const subTasksDone = Object.values(cardToBeRendered.subTasks).find(subTask => subTask.status === 'done')


    return ( 
        <Link to={boardId + '/' + cardId + '/ShowTask'} style={{textDecoration: 'none'}}>
            <div className='cardContainer'>
                <h3>{cardToBeRendered.name}</h3>
                <p>{subTasksDone} of {subTasksTotal} subtasks</p>
            </div>
        </Link>

     );
}

export {Card} ;