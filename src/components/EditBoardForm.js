import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { selectBoards } from '../features/boards/boardsSlice'
import { selectColumns } from '../features/columns/columnsSlice'
import { addBoardToBoards } from '../features/boards/boardsSlice';
import { addColumnToColumns } from '../features/columns/columnsSlice';
import cross from '../assets/cross-icon.svg';


function EditBoardForm() {

    const { boardId } = useParams();
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const dispatch = useDispatch();
    const history = useHistory();
    const [nameForBoard, setNameForBoard] =       useState('');
    const [namesForColumns, setNamesForColumns] = useState([]);


    // initializing the local states with the values of the selected board to pre-fill the form
    useEffect(() => {
        setNameForBoard(allBoards[boardId].name);

        // iterating over all columns of the selected board to collect the id and name
        let initialColumns = [];
        allBoards[boardId].columnIds.map(id => initialColumns.push({name:allColumns[id].name , id: id}) )
        setNamesForColumns(initialColumns)

    },[boardId])
    


    const changeColumnName = (e) => {
        const index = +e.target.id                   // the + in front of e.target.id converts string to number
        const columnNames = [...namesForColumns]; // copy to prevent state-mutation
        columnNames[index].name = e.target.value;    // change the indexed element to new value
        setNamesForColumns([...columnNames]);     // set all new names to the state
    }

    const removeColumnName = (e) => {
        const index = +e.target.id
        const columnNames = [...namesForColumns]; // copy to prevent state-mutation
        columnNames.splice(index,1)                  // remove the indexed element from the array 
        setNamesForColumns([...columnNames]);     // set all new names to the state
    }

    const addColumnName =  () => {
        const columnNames = [...namesForColumns]; // copy to prevent state-mutation
        columnNames.push({name: 'new', id: Math.floor(Math.random()*1000) });                   // add new empty entry
        setNamesForColumns([...columnNames]);     // set all new names to the state
    }




    const storeChanges = () => {

        // overriding the existing board with old id but new name and columnIds
        dispatch(addBoardToBoards({name:nameForBoard, id: boardId, columnIds: namesForColumns.map(el => el.id)}))

         // create all the new columns
         namesForColumns.forEach((column) => {
            dispatch(addColumnToColumns({name: column.name, id: column.id.toString(), cardIds:[]}))
        })

        history.goBack()
    }

    const closeTheForm = (e) => {
        history.goBack()
    }

    return ( 
        <div className='formBackground' >
            <div className='formContainer'>
                <h3 className='formTitle'>Edit the Board here</h3>
                <form>
        	        
                    <label for='boardNameInput'>Name</label>
                    <input 
                        key = {33} //{Math.floor(Math.random()*1000)}
                        type='text'
                        id='boardNameInput'
                        value={nameForBoard}
                        onChange={(e) => setNameForBoard(e.target.value)}
                    />
                    <label id='columnLabel'>Columns</label>
                    <ul>
                        {namesForColumns.map((column, index) => {
                            return (
                                <li key={column.id + 0}>
                                    <input
                                        className='inputField subInput'
                                        key = {column.id + 1}
                                        type='text'
                                        id={index}
                                        value={column.name}
                                        aria-labelledby='columnLabel'
                                        onChange={(e) => changeColumnName(e) } 
                                    />
                                    <button
                                        className='closingCrossButton'     
                                        key = {column.id + 2}
                                        id={index} 
                                        aria-label='remove column'
                                        onClick={(e) => removeColumnName(e)}>
                                            <img src={cross} id={index} className='iconCross' key={column.id + 13} alt=''/>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <button
                        className = "formButton addNewButton" 	
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        onClick={addColumnName}>
                        Add more columns
                    </button>
                    <button 
                        className = "formButton createNewButton"
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        onClick={storeChanges}>
                        Save the Changes
                    </button>
                    <button 
                        className = "closingCrossButton closingFormButton"
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        aria-label='close Form'
                        onClick={closeTheForm}>
                            <img src={cross} className='iconCross' alt=''/>
                    </button>
                </form>
            </div>
        </div>
        );
}

export {EditBoardForm};