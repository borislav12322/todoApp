import React, { ReactElement } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import ToDoListsContainer from './pages/toDoLists/ToDoListsContainer';
import NavBarContainer from './components/navBar/NavBarContainer';

const App = (): ReactElement => (
  <BrowserRouter>
    <div className="App">
      <NavBarContainer />
      <div className="appContainer">
        <div className="appWrapper">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/toDoLists" element={<ToDoListsContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
