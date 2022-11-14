import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectOptions, setSubMenuVisibility, setSubMenuBoardVisibility, setSubMenuTaskVisibility  } from '../features/options/optionsSlice'
import iconDoener from '../assets/doener-icon.svg'



function SubMenu(props) {

    // const [ useCase, top, right ] = props

    const useCase = props.useCase;
    const board = useCase === 'board';
    const top = props.top;
    const right = props.right;

    const { boardId } = useParams();  
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const options = useSelector(selectOptions);
    const [showSubMenu, setShowSubMenu] = useState(false);
    

    
    // Differenzes between SubMenu 'board' and SubMenu 'card':
    // 1.) Platzierung des Button, vielleicht auch die Platzierung des Menus in Relations zum Button
    
    useEffect(() => {
        if (useCase === 'board') {
            setShowSubMenu(options.subMenuBoardVisiblity);
        }
        if (useCase === 'task') {
            setShowSubMenu(options.subMenuTaskVisiblity);
        }
    },[options])
    
    
    
    // const subMenuClassListVisible   = 'subMenuContainer subMenuVisible';
    // const subMenuClassListInvisible = 'subMenuContainer subMenuInvisible';

    const subMenuControl = () => {

        if (useCase === 'board') {
            console.log('subMenuControl board')
            dispatch(setSubMenuBoardVisibility(!options.subMenuBoardVisiblity))
        }
        if (useCase === 'task') {
            console.log('subMenuControl task')
            dispatch(setSubMenuTaskVisibility(!options.subMenuTaskVisiblity))
        }
    }

    return ( 
        <div style={{position: 'absolute', top:top, right:right}}>
            <button
            className='buttonOpenSubMenu' 
            aria-label='open submenu'
            onClick={subMenuControl}
            >

                <img 
                className='iconDoener'
                src={iconDoener} 
                alt=''/>
            </button>

            <div className={showSubMenu ? 'subMenuContainer subMenuVisible' : 'subMenuContainer subMenuInvisible' }
                aria-hidden={!showSubMenu}>
                <Link className='subMenuButton' 
                        to={board ? `${boardId}/EditBoardForm` : `/${boardId}/${taskId}/EditTaskForm`} 
                        onClick={() => dispatch(setSubMenuVisibility(false)) }>                        
                        { board ? 'Edit the Board' : 'Edit the Task'}
                </ Link>
                <Link className='subMenuButton' 
                        to={board ? `${boardId}/DeleteBoard` : `/${boardId}/${taskId}/DeleteTask` }
                        onClick={() => dispatch(setSubMenuVisibility(false)) }
                        style={{color: 'red', fontWeight:'500'}} >
                        { board ? 'Delete the Board' : 'Delete the Task'}
                </ Link>
            </div>
        </div>
     );
}

export { SubMenu };