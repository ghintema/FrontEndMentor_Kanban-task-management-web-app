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
import { DeleteBoard } from '../components/DeleteBoard.js'
import { DeleteTask } from '../components/DeleteTask.js'


function App() {

    return (
      <Router>
        <div className='Container'>
          <header className='headerContainer'>
            <Logo />
            <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId?">
              <BoardHeader />
            </Route>
          </header>
          <main >
              <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId?">
                <Navigation />
              </Route>
              <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId?">
                <Board />
              </Route>
          </main>
        </div>

        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId?/NewBoardForm">
          <NewBoardForm />
        </Route>
        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId/EditBoardForm">
          <EditBoardForm />
        </Route>
        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId/NewTaskForm">
          <NewTaskForm />
        </Route>
        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId/DeleteBoard">
          <DeleteBoard />
        </Route>
        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId/:taskId/DeleteTask">
          <DeleteTask />
        </Route>
        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId/:taskId/ShowTask">
          <ShowTask />
        </Route>
        <Route path="/FrontEndMentor_Kanban-task-management-web-app/:boardId/:taskId/EditTaskForm">
          <EditTaskForm />
        </Route>
      </Router>
      );
}

export {App};

