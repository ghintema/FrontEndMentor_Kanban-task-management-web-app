import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { selectCards } from '../features/cards/cardsSlice';
import cross from '../assets/cross-icon.svg';
import { selectColumns } from '../features/columns/columnsSlice';


function EditTaskForm() {

    const { taskId }  = useParams();
    const history = useHistory();
    const allCards = useSelector(selectCards);
    const allColumns = useSelector(selectColumns)
    // const presentCard = allCards[taskId];

    const [presentCard, setPresentCard] = useState({subTasks: []})
    
    useEffect(() => { 
        setPresentCard(allCards[taskId])
    },[taskId])
    
    // const [nameForTask, setNameForTask] = useState('');
    // const [subTasks, setSubTasks]       = useState([]);


    // // initializing the local states with the existing values 
    // // of the selected card to pre-fill the form and to preserv unchanged data
    // useEffect(() => { 

    //     setNameForTask(presentCard.name)

    //      // iterating over all existing subTasks of the selected card to collect the id, name and status

    //     let initialSubTasks = [];
    //     presentCard.subTasks.map(subTask => initialSubTasks.push( { name: subTask.name,
    //                                                                 id: subTask.id,
    //                                                                 status: subTask.status}))
    //     setSubTasks(initialSubTasks)



    // }, [taskId])




    
   

    // initializing the local states with the existing values 
    // of the selected card to pre-fill the form and to preserv unchanged data
    

  
    const changeTaskName = (e) => {
        let presentCardCopy = {...presentCard}; // copy to prevent state-mutation
        presentCardCopy.name = e.target.value;  // change the copy as needed.
        setPresentCard(presentCardCopy);        // reset the state with the copy
    }

    const changeSubTaskName = (e) => {
        const index = +e.target.id
        let presentCardCopy = {...presentCard};             // copy to prevent state-mutation
        presentCardCopy.subTasks[index].name = e.target.value;// reset the state with the copy
    }


    const addSubTask = (e) => {

        const index = +e.target.id
        let presentCardCopy = {...presentCard};             // copy to prevent state-mutation
        presentCardCopy.subTasks.push({ name: e.target.value, 
                                        id: Math.floor(Math.random()*1000).toString() })



        // one blank inputfield is in the form to offer. 
        // OnChange of this field a new object is add to local subTask-State
        // POSSIBLE BONUS: This input field is hidden in an animated accordeon
        // Alternatively: The known 'add new Subtask' button bellow the list of existing subTask but without a blank input field.
        //      Advantage: addSubTask would work exactly like in NewTaskForm

        // It maybe important to give the new subtasks a completely new status to differ  the rendering.
    }

    const removeSubTask = (e) => {

        const index = +e.target.id
        let presentCardCopy = {...presentCard};             // copy to prevent state-mutation
        presentCardCopy.subTasks.splice(index,1);           // remove the indexed element from the array
        setPresentCard(presentCardCopy)                     // reset the state with the copy

    }

    const choseTargetColumn = (e) => {
        
        let presentCardCopy = {...presentCard};             // copy to prevent state-mutation
        presentCardCopy.ColumnId = e.target.value;
        setPresentCard(presentCardCopy);                     // reset the state with the copy

    }

    const storeChanges = () => {

        
        history.goBack() // to close the form

    }

    const closeTheFormBackground = (e) => {
        console.log( e.target.classList)
        if (e.target.classList.contains('formBackground') ) {
            history.goBack() // to close the form
        }
    }

    const closeTheFormCross = (e) => {
        console.log( e.target.classList)
        if (e.target.classList.contains('iconCross') ) {
            history.goBack() // to close the form
        }
    }
    return ( 
        <div className='formBackground' onClick={closeTheFormBackground}>
            <div className='formContainer'>
                <h3 className='formTitle'>Edit the Task</h3>
                <form>
        	        
                    <label for='cardNameInput'>Name</label>
                    <input 
                        key = {33} //{Math.floor(Math.random()*1000)}
                        type='text'
                        id='cardNameInput'
                        value={presentCard.name}
                        onChange={changeTaskName}
                    />


                    {/* description here */}

                    <label id='columnLabel'>Subtasks</label>
                    <ul>
                        {presentCard.subTasks
                            .filter(subTask => subTask.status === 'open' || subTask.status === 'done')
                            .map((subTask, index) => {
                                return (
                                    <li 
                                        className='subTaskPresentation'
                                        key={subTask.id + 0}
                                    >
                                        <input 
                                            type='text'
                                            // className='checkbox'
                                            id={index}
                                            onChange={changeSubTaskName}
                                        />
                                        <button
                                            className='closingCrossButton'     
                                            key = {subTask.id + 2}
                                            id={index} 
                                            aria-label='remove sub task'
                                            onClick={(e) => removeSubTask(e)}
                                        >
                                            <img src={cross} id={index} className='iconCross' key={subTask.id + 13} alt=''/>
                                        </button>
                                    </li>
                                )
                            })
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
                </form>
            
            </div>
        </div>
     );
}

export { EditTaskForm };