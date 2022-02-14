import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import ToDoLists from './ToDoLists';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../BLL/store';
import {
  addToDoListAC,
  changeToDoStatusAC,
  deleteToDoAC,
  getToDoListsTC,
  ToDoListType,
} from '../../BLL/appReducer';

const ToDoListsContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const [newTitleValue, setNewTitleValue] = useState<string>('');
  const toDoLists = useSelector<AppRootStateType, ToDoListType[]>(
    state => state.appReducer.toDoLists,
  );

  const changeToDoStatus = (id: number, status: boolean): void => {
    dispatch(changeToDoStatusAC(id, status));
  };
  const addToDo = (): void => {
    if (newTitleValue) {
      dispatch(addToDoListAC(newTitleValue));
      setNewTitleValue('');
    }
  };
  const newTitleOnKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addToDo();
    }
  };
  const newTitleInputHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitleValue(e.currentTarget.value);
  };
  const removeToDoList = (id: number): void => {
    dispatch(deleteToDoAC(id));
  };

  useEffect(() => {
    dispatch(getToDoListsTC());
  }, []);

  return (
    <ToDoLists
      toDoLists={toDoLists}
      changeToDoStatus={changeToDoStatus}
      addToDo={addToDo}
      newTitleValue={newTitleValue}
      newTitleInputHandle={newTitleInputHandle}
      newTitleOnKeyPressHandle={newTitleOnKeyPressHandle}
      removeToDoList={removeToDoList}
    />
  );
};

export default ToDoListsContainer;
