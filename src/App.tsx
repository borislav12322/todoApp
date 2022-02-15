import React, { ReactElement } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import ToDoListsContainer from './pages/toDoLists/ToDoListsContainer';
import NavBarContainer from './components/navBar/NavBarContainer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './BLL/store';
import { InitialStateType } from './BLL/appReducer';
import LoadingComponent from './components/loadingComponent/LoadingComponent';

const App = (): ReactElement => {
  const { isLoading } = useSelector<AppRootStateType, InitialStateType>(
    state => state.appReducer,
  );
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarContainer />
        <div className="appContainer">
          {isLoading && <LoadingComponent />}
          <div className="appWrapper">
            <Routes>
              <Route path="/todoApp" element={<MainPage />} />
              <Route path="/toDoLists" element={<ToDoListsContainer />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
