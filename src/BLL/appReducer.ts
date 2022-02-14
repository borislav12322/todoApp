import { Dispatch } from 'redux';
import { toDoAPI } from '../DAL/API';

export interface ToDoListType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface InitialStateType {
  toDoLists: ToDoListType[];
  isLoading: boolean;
}
type ActionsType =
  | GetToDoListsACType
  | SetIsLoadingACType
  | AddToDoListACType
  | ChangeToDoStatusACType
  | ChangeToDoTitleACType
  | DeleteToDoACType;

const initialState = {
  toDoLists: [],
  isLoading: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'GET-TO-DO-LISTS':
      return {
        ...state,
        toDoLists: action.toDoLists,
      };
    case 'SET-IS-LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'CHANGE-TO-DO-STATUS':
      return {
        ...state,
        toDoLists: [
          ...state.toDoLists.map(item =>
            item.id === action.id ? { ...item, completed: action.status } : item,
          ),
        ],
      };
    case 'CHANGE-TO-DO-TITLE':
      return {
        ...state,
        toDoLists: [
          ...state.toDoLists.map(item =>
            item.id === action.id ? { ...item, title: action.title } : item,
          ),
        ],
      };
    case 'ADD-TO-DO':
      return {
        ...state,
        toDoLists: [
          {
            userId: 0,
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            id: Math.floor(Math.random() * (1000 - 200)) + 200,
            title: action.title.trim(),
            completed: false,
          },
          ...state.toDoLists,
        ],
      };
    case 'DELETE-TO-DO':
      return {
        ...state,
        toDoLists: [...state.toDoLists.filter(item => item.id !== action.id)],
      };
    default:
      return state;
  }
};

export type GetToDoListsACType = ReturnType<typeof getToDoListsAC>;

export const getToDoListsAC = (toDoLists: ToDoListType[]) =>
  ({
    type: 'GET-TO-DO-LISTS',
    toDoLists,
  } as const);

export type SetIsLoadingACType = ReturnType<typeof setIsLoadingAC>;

export const setIsLoadingAC = (isLoading: boolean) =>
  ({
    type: 'SET-IS-LOADING',
    isLoading,
  } as const);

export type AddToDoListACType = ReturnType<typeof addToDoListAC>;

export const addToDoListAC = (title: string) =>
  ({
    type: 'ADD-TO-DO',
    title,
  } as const);

export type ChangeToDoStatusACType = ReturnType<typeof changeToDoStatusAC>;

export const changeToDoStatusAC = (id: number, status: boolean) =>
  ({
    type: 'CHANGE-TO-DO-STATUS',
    id,
    status,
  } as const);

export type ChangeToDoTitleACType = ReturnType<typeof changeToDoTitleAC>;

export const changeToDoTitleAC = (id: number, title: string) =>
  ({
    type: 'CHANGE-TO-DO-TITLE',
    id,
    title,
  } as const);

export type DeleteToDoACType = ReturnType<typeof deleteToDoAC>;

export const deleteToDoAC = (id: number) =>
  ({
    type: 'DELETE-TO-DO',
    id,
  } as const);

export const getToDoListsTC = () => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  toDoAPI.getToDoLists().then(res => {
    dispatch(getToDoListsAC(res.data.splice(+'0', +'25')));
  });
};
