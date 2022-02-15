import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import EditableField from './EditableField';
import { changeToDoListTitleTC, changeToDoTitleAC } from '../../BLL/appReducer';
import { useDispatch } from 'react-redux';

type PropsType = {
  text: string;
  toDoId: number;
};

const EditableFieldContainer = React.memo(({ text, toDoId }: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(text);
  const showInput = useCallback((): void => {
    setEditMode(true);
  }, []);
  const onInputChangeHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };
  const changeToDoTitle = useCallback((): void => {
    dispatch(changeToDoListTitleTC(toDoId, inputValue));
    dispatch(changeToDoTitleAC(toDoId, inputValue));
    setEditMode(false);
  }, [dispatch, toDoId, inputValue]);
  const onKeyPressHandle = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        changeToDoTitle();
        setEditMode(false);
      }
    },
    [changeToDoTitle],
  );
  return (
    <EditableField
      editMode={editMode}
      showInput={showInput}
      text={text}
      toDoId={toDoId}
      changeToDoTitle={changeToDoTitle}
      onKeyPressHandle={onKeyPressHandle}
      inputValue={inputValue}
      onInputChangeHandle={onInputChangeHandle}
    />
  );
});

export default EditableFieldContainer;
