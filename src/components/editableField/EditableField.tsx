import React, { ChangeEvent, KeyboardEvent, ReactElement } from 'react';
import s from './editableField.module.css';

type PropsType = {
  editMode: boolean;
  showInput: () => void;
  text: string;
  toDoId: number;
  changeToDoTitle: () => void;
  onKeyPressHandle: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputValue: string;
  onInputChangeHandle: (e: ChangeEvent<HTMLInputElement>) => void;
};

const EditableField = React.memo(
  ({
    editMode,
    showInput,
    text,
    toDoId,
    changeToDoTitle,
    onKeyPressHandle,
    inputValue,
    onInputChangeHandle,
  }: PropsType): ReactElement =>
    editMode ? (
      <input
        type="text"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onBlur={changeToDoTitle}
        value={inputValue}
        onChange={onInputChangeHandle}
        onKeyPress={onKeyPressHandle}
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <span className={s.itemTitle} onClick={showInput} role="button" tabIndex={0}>
        {text}
      </span>
    ),
);

export default EditableField;
