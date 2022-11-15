import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoards } from './boardsSlice';
import { selectColumns } from '../columns/columnsSlice';
import { selectOptions, setSubMenuVisibility } from '../options/optionsSlice';
import { Column } from '../columns/Column';
import { EmptyBoard } from '../../components/EmptyBoard'
import { NoBoard } from '../../components/NoBoard'
import  { allColorSchemes }  from '../../colorScheme';

// Look for the path for the id of the board wich is supposed to be shown.
// If the board doesn't have any columns, then show message component <EmptyBoard /> 'the board is empty...' and button '+ Add new column' 


function Board() {

    const allBoards = useSelector(selectBoards);
    const { boardId } = useParams()
    const dispatch = useDispatch();
    const options = useSelector(selectOptions);
    const [ colorScheme, setColorScheme ] = useState({});

    useEffect(() => {

        if (options.nightMode) {
            setColorScheme({'main2':             allColorSchemes.main2.nightMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.nightMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.nightMode});
        } else if (!options.nightMode) {
            setColorScheme({'main2':             allColorSchemes.main2.dayMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.dayMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.dayMode});
        }

    },[options.nightMode])
   

    let columnsToBeRendered = []

    // const boardSelected = /[0-9]/.test(boardId) // test for a numbered id.

    const boardIdPlausible = Object.keys(allBoards).includes(boardId);

    if  (boardId && boardIdPlausible) {
         columnsToBeRendered = allBoards[boardId].columnIds // Array with Ids of all columns belonging to the selected board    
    }

    const linkToEditBoard = boardId && boardIdPlausible ? `${boardId}/EditBoardForm` : '/EditBoardForm'
    const boardIsEmpty = columnsToBeRendered.length === 0;

    return ( 
        <section    className='boardContainer'
                    style={colorScheme.main2} 
                    onClick={() => dispatch(setSubMenuVisibility(false)) }>
            { !boardIdPlausible ? <NoBoard /> : 
             boardIsEmpty ? <EmptyBoard /> : (
             columnsToBeRendered.map((id) => <Column id={id} key={id} />)
             )}
            
        </section>
     );
} 

export { Board } ;