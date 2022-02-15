import React, { ChangeEvent, KeyboardEvent, ReactElement } from 'react';
import s from './toDoLists.module.css';
import { ToDoListType } from '../../BLL/appReducer';
import PlusBtn from '../../assets/images/plusBtn.png';
import EditableFieldContainer from '../../components/editableField/EditableFieldContainer';
import Paginator from '../../components/paginator/Paginator';

type PropsType = {
  toDoLists: ToDoListType[];
  changeToDoStatus: (id: number, status: boolean) => void;
  addToDo: () => void;
  newTitleValue: string;
  newTitleInputHandle: (e: ChangeEvent<HTMLInputElement>) => void;
  newTitleOnKeyPressHandle: (e: KeyboardEvent<HTMLInputElement>) => void;
  removeToDoList: (id: number) => void;
};

const ToDoLists = React.memo(
  ({
    toDoLists,
    changeToDoStatus,
    addToDo,
    newTitleValue,
    newTitleInputHandle,
    newTitleOnKeyPressHandle,
    removeToDoList,
  }: PropsType): ReactElement => (
    <div className={s.toDoListsWrapper}>
      <div className={s.toDoListTop}>
        <h2 className={s.title}>To Do Lists</h2>
        <Paginator />
      </div>
      <div className={s.addToDoWrapper}>
        <input
          className={s.newToDoInput}
          type="text"
          value={newTitleValue}
          onChange={newTitleInputHandle}
          onKeyPress={newTitleOnKeyPressHandle}
        />
        <button className={s.addNewToDoButton} type="button" onClick={addToDo}>
          <img src={PlusBtn} alt="add btn" />
        </button>
      </div>
      <ul className={s.toDoList}>
        {toDoLists.map(item => {
          const onClickHandle = (): void => {
            removeToDoList(item.id);
          };
          return (
            <li className={s.toDoListItem} key={item.id}>
              <button className={s.deleteBtn} type="button" onClick={onClickHandle}>
                x
              </button>
              <EditableFieldContainer text={item.title} toDoId={item.id} />
              <input
                className={s.checkbox}
                type="checkbox"
                checked={item.completed}
                onChange={e => changeToDoStatus(item.id, e.currentTarget.checked)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  ),
);

export default ToDoLists;
