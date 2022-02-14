import React, { KeyboardEvent, ReactElement, useState } from 'react';
import EditableField from './EditableField';
import { changeToDoTitleAC } from '../../BLL/appReducer';
import { useDispatch } from 'react-redux';

type PropsType = {
  text: string;
  toDoId: number;
};

const EditableFieldContainer = ({ text, toDoId }: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const showInput = (): void => {
    setEditMode(true);
  };
  const hideInput = (): void => {
    setEditMode(false);
  };
  const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      hideInput();
    }
  };
  const changeToDoTitle = (id: number, title: string): void => {
    dispatch(changeToDoTitleAC(id, title));
  };
  return (
    <EditableField
      editMode={editMode}
      showInput={showInput}
      hideInput={hideInput}
      text={text}
      toDoId={toDoId}
      changeToDoTitle={changeToDoTitle}
      onKeyPressHandle={onKeyPressHandle}
    />
  );
};

export default EditableFieldContainer;
