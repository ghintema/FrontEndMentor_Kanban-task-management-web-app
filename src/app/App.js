import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { Navigation } from '../components/Navigation.js';
import { NewBoardForm } from '../components/NewBoardForm.js'
import { NewTaskForm } from '../components/NewTaskForm.js'
import { Logo } from '../components/Logo.js';
import { BoardHeader } from '../components/BoardHeader.js'
import { Board } from '../features/boards/Board'

function App() {

    // const history = useHistory();

    // useEffect(() => {
    //   history.push();
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
              <Navigation />
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
        <Route path="/NewTaskForm">
          <NewTaskForm />
        </Route>
        <Route path="/*?/*?/EditTaskForm/:id?">
            <NewTaskForm />
        </Route>
      </Router>
      );
}

export {App};

