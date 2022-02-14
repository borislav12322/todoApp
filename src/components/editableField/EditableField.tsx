import React, { KeyboardEvent, ReactElement } from 'react';
import s from './editableField.module.css';

type PropsType = {
  editMode: boolean;
  showInput: () => void;
  hideInput: () => void;
  text: string;
  toDoId: number;
  changeToDoTitle: (id: number, title: string) => void;
  onKeyPressHandle: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const EditableField = ({
  editMode,
  showInput,
  hideInput,
  text,
  toDoId,
  changeToDoTitle,
  onKeyPressHandle,
}: PropsType): ReactElement =>
  editMode ? (
    <input
      type="text"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      onBlur={hideInput}
      value={text}
      onChange={e => changeToDoTitle(toDoId, e.currentTarget.value)}
      onKeyPress={onKeyPressHandle}
    />
  ) : (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <span className={s.itemTitle} onClick={showInput} role="button" tabIndex={0}>
      {text}
    </span>
  );

export default EditableField;
