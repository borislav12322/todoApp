import { Dispatch } from 'redux';
import { toDoAPI } from '../DAL/API';

export interface ToDoListType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface InitialStateType {
  toDoLists: ToDoListType[];
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  toDoListsCount: number;
}
type ActionsType =
  | GetToDoListsACType
  | SetIsLoadingACType
  | AddToDoListACType
  | ChangeToDoStatusACType
  | ChangeToDoTitleACType
  | DeleteToDoACType
  | SetToDoListsCountACType
  | SetCurrentPageACType;

const initialState = {
  toDoLists: [],
  isLoading: false,
  pageSize: 25,
  currentPage: 1,
  toDoListsCount: 0,
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
    case 'SET-TO-DO-LISTS-COUNT':
      return {
        ...state,
        toDoListsCount: action.count,
      };
    case 'SET-CURRENT-PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
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

export const addToDoListAC = (title: string, id: number) =>
  ({
    type: 'ADD-TO-DO',
    title,
    id,
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

export type SetToDoListsCountACType = ReturnType<typeof setToDoListsCountAC>;

export const setToDoListsCountAC = (count: number) =>
  ({
    type: 'SET-TO-DO-LISTS-COUNT',
    count,
  } as const);

export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;

export const setCurrentPageAC = (currentPage: number) =>
  ({
    type: 'SET-CURRENT-PAGE',
    currentPage,
  } as const);

export const getToDoListsTC =
  (pageSize: number, currentPage: number) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true));
    toDoAPI
      .getToDoLists(pageSize, currentPage)
      .then(res => {
        dispatch(getToDoListsAC(res.data));
      })
      .catch(err => {})
      .finally(() => {
        dispatch(setIsLoadingAC(false));
      });
  };

export const getToDoListsCountTC = () => (dispatch: Dispatch) => {
  toDoAPI.getToDoListsCount().then(res => {
    dispatch(setToDoListsCountAC(res.data.length));
  });
};

export const changeToDoListStatusTC =
  (id: number, completed: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true));
    toDoAPI
      .changeToDoListStatus(id, completed)
      .then(res => {
        dispatch(changeToDoStatusAC(id, completed));
        console.log(res.data);
      })
      .catch(err => {})
      .finally(() => {
        dispatch(setIsLoadingAC(false));
      });
  };

export const changeToDoListTitleTC =
  (id: number, title: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true));
    toDoAPI
      .changeToDoListTitle(id, title)
      .then(res => {
        dispatch(changeToDoTitleAC(id, title));
        console.log(res.data);
      })
      .catch(err => {})
      .finally(() => {
        dispatch(setIsLoadingAC(false));
      });
  };
export const removeToDoListTC = (id: number) => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  toDoAPI
    .removeToDoList(id)
    .then(res => {
      dispatch(deleteToDoAC(id));
      console.log(res.data);
    })
    .catch(err => {})
    .finally(() => {
      dispatch(setIsLoadingAC(false));
    });
};

export const addNewToDoListTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  toDoAPI
    .addNewToDoList(title)
    .then(res => {
      dispatch(addToDoListAC(title, res.data.id));
      console.log(res.data);
    })
    .catch(err => {})
    .finally(() => {
      dispatch(setIsLoadingAC(false));
    });
};
