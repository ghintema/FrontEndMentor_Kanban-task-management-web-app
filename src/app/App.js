import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import './App.css';
import { Navigation } from '../components/Navigation.js';
import { NewBoardForm } from '../components/NewBoardForm.js'
import { NewTaskForm } from '../components/NewTaskForm.js'
import { EditBoardForm } from '../components/EditBoardForm.js'
import { EditTaskForm } from '../components/EditTaskForm.js';
import { ShowTask } from '../components/ShowTask';
import { Logo } from '../components/Logo.js';
import { BoardHeader } from '../components/BoardHeader.js'
import { Board } from '../features/boards/Board'


function App() {

    // const history = useHistory();

    // useEffect(() => {
    //   history.push({ pathname: '/'});
    // },[])

    return (
      <Router>
        <div className='Container'>
          <header className='headerContainer'>
            <Logo />
            <Route path="/:boardId?">
              <BoardHeader />
            </Route>
          </header>
          <main >
            <aside >
              <Route path="/:boardId?">
                <Navigation />
              </Route>
            </aside>
            <section>
              <Route path="/:boardId?">
                <Board />
              </Route>
            </section>
          </main>
        </div>

        <Route path="/:boardId?/NewBoardForm">
          <NewBoardForm />
        </Route>
        <Route path="/:boardId/EditBoardForm">
          <EditBoardForm />
        </Route>
        <Route path="/:boardId/NewTaskForm">
          <NewTaskForm />
        </Route>
        <Route path="/:boardId/:taskId/ShowTask">
          <ShowTask />
        </Route>
        <Route path="/:boardId/:taskId/EditTaskForm">
          <EditTaskForm />
        </Route>
      </Router>
      );
}

export {App};

