import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addCardToCards, selectCards } from '../features/cards/cardsSlice';
import { addCardIdToColumn, removeCardIdFromColumn, selectColumns } from '../features/columns/columnsSlice';
import cross from '../assets/cross-icon.svg';


function ShowTask() {

    const { taskId }  = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const allCards = useSelector(selectCards);
    const allColumns = useSelector(selectColumns);
    // const presentCard = allCards[taskId];

    const [presentCard, setPresentCard] = useState({subTasks: [], boardColumnIds:[]})
   
    // initializing the local states with the existing values 
    // of the selected card to pre-fill the form and to preserv unchanged data
    useEffect(() => { 

        setPresentCard(allCards[taskId])

    },[taskId])

    const changeSubTaskStatus = (e) => {

        const index = +e.target.id

        // let presentCardCopy = {...presentCard};             // copy to prevent state-mutation
        let presentCardCopy = JSON.parse(JSON.stringify(presentCard)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        if (e.target.checked) {
            presentCardCopy.subTasks[index].status = 'done';  // change the copy as needed.
        } else {
            presentCardCopy.subTasks[index].status = 'open';  // change the copy as needed.
        }
        setPresentCard(presentCardCopy);                     // reset the state with the copy

        dispatch(addCardToCards({...presentCardCopy}))
        console.log(presentCardCopy)

    }

    const choseTargetColumn = (e) => {
        
        let presentCardCopy = {...presentCard};             // copy to prevent state-mutation
        presentCardCopy.columnId = e.target.value;
        setPresentCard(presentCardCopy);                     // reset the state with the copy

        dispatch(addCardToCards({...presentCardCopy}))
        
        dispatch(removeCardIdFromColumn([presentCard.columnId, taskId]))
        dispatch(addCardIdToColumn([presentCardCopy.columnId, taskId]));
        
        
        console.log(e.target.value)


    }


    const closeTheFormBackground = (e) => {
        if (e.target.classList.contains('formBackground') ) {
            history.goBack() // to close the form
        }
    }

    const closeTheFormCross = (e) => {
        if (e.target.classList.contains('iconCross') ) {
            history.goBack() // to close the form
        }
    }


    return ( 
        <div className='formBackground' onClick={closeTheFormBackground} >
            <div className='formContainer'>
                <h3 className='formTitle'>{presentCard.name}</h3>


                <p>{presentCard.description} </p>    {/* description here */}

                <label id='columnLabel'>Subtasks</label>
                <ul>
                    {presentCard.subTasks.map((subTask, index) => {
                        return (
                            <li 
                                className='subTaskPresentation'
                                key={subTask.id + 0}
                            >
                                <input 
                                    type='checkbox'
                                    className='checkbox'
                                    id={index}
                                    onChange={changeSubTaskStatus}
                                />
                                <label
                                    for={index}
                                    id={index}
                                    className={subTask.status === 'open' ? 'subTaskOpen' : 'subTaskDone'}
                                >
                                    {subTask.name}
                                </label>
                               
                            </li>
                        )})
                    }
                </ul>

                <select id='selectStatus' className='selectStatus' onChange={choseTargetColumn}>
                    {presentCard.boardColumnIds.map(id => {
                        return <option key={id} id={id} value={id}>{allColumns[id].name}</option>
                    })}
                </select>
                    
                <button 
                    className = "closingCrossButton closingFormButton"
                    type = "button"
                    key = {Math.floor(Math.random()*1000)}
                    aria-label='close Form'
                    onClick={closeTheFormCross}>
                        <img src={cross} className='iconCross' alt=''/>
                </button> 
        
            
            </div>
        </div>
     );
}

export { ShowTask };