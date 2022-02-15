import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ToDoLists from './ToDoLists';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../BLL/store';
import {
  addNewToDoListTC,
  changeToDoListStatusTC,
  changeToDoStatusAC,
  getToDoListsCountTC,
  getToDoListsTC,
  InitialStateType,
  removeToDoListTC,
} from '../../BLL/appReducer';

const ToDoListsContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const [newTitleValue, setNewTitleValue] = useState<string>('');
  const { toDoLists, currentPage, pageSize } = useSelector<
    AppRootStateType,
    InitialStateType
  >(state => state.appReducer);

  const changeToDoStatus = useCallback(
    (id: number, status: boolean): void => {
      dispatch(changeToDoListStatusTC(id, status));
      dispatch(changeToDoStatusAC(id, status));
    },
    [dispatch],
  );
  const addToDo = useCallback((): void => {
    if (newTitleValue) {
      dispatch(addNewToDoListTC(newTitleValue));
      setNewTitleValue('');
    }
  }, [newTitleValue, dispatch]);
  const newTitleOnKeyPressHandle = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        addToDo();
      }
    },
    [addToDo],
  );
  const newTitleInputHandle = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitleValue(e.currentTarget.value);
  }, []);
  const removeToDoList = useCallback(
    (id: number): void => {
      dispatch(removeToDoListTC(id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getToDoListsCountTC());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getToDoListsTC(pageSize, currentPage));
  }, [dispatch, pageSize, currentPage]);

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
