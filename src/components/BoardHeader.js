import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoards } from '../features/boards/boardsSlice'
import { selectOptions, setSubMenuVisibility } from '../features/options/optionsSlice';
import { SubMenu } from './SubMenu';
import iconDoener from '../assets/doener-icon.svg'
import  { allColorSchemes }  from '../colorScheme';


// rendered den Titel des aktiven board.
// der aktive Board wird über die url ausgelesen.

function BoardHeader() {

    const { boardId } = useParams()  
    const allBoards = useSelector(selectBoards);
    const options = useSelector(selectOptions);

    const [ colorScheme , setColorScheme ] = useState({})

    useEffect(() => {

      if (options.nightMode) {
          setColorScheme({'main':             allColorSchemes.main.nightMode,
                          'main2':            allColorSchemes.main2.nightMode,
                          'buttonPrimary':    allColorSchemes.buttonPrimary.nightMode,
                          'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                          'label':            allColorSchemes.label.nightMode});
      } else if (!options.nightMode) {
          setColorScheme({'main':             allColorSchemes.main.dayMode,
                          'main2':            allColorSchemes.main2.dayMode,
                          'buttonPrimary':    allColorSchemes.buttonPrimary.dayMode,
                          'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                          'label':            allColorSchemes.label.dayMode});
      }

    },[options.nightMode])

    
    let title = 'No Board selected'

    const boardIdPlausible = Object.keys(allBoards).includes(boardId);

    if  (boardId && boardIdPlausible) {
      title = allBoards[boardId].name;
    } 

    // const subMenuClassListVisible   = 'subMenuContainer subMenuVisible';
    // const subMenuClassListInvisible = 'subMenuContainer subMenuInvisible';

    // const subMenuControl = () => {
    //   dispatch(setSubMenuVisibility(!options.subMenuVisiblity))
    // }

    

    return (
      <div className='boardHeaderContainer' style={colorScheme.main}>
        <h1 style={colorScheme.main}>{title}</h1>
        { boardIdPlausible  ? <Link className='noneFormButton createNewButton' to={`${boardId}/NewTaskForm`} style={colorScheme.buttonPrimary}>+ Add new Task</Link>
                            : <Link className='noneFormButton createNewButton' to={'/'} style={{backgroundColor: '#d8d7f1', color:'#fff', cursor:'default'}}>+ Add new Task</Link>}
      
        {  boardIdPlausible  && <SubMenu useCase='board' top='50px' right='30px' />}

      </div>
        
      );
}

export {BoardHeader};