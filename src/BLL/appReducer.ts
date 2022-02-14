interface ToDoListType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface InitialStateType {
  toDoLists: ToDoListType[];
  isLoading: boolean;
}
type ActionsType = GetToDoListsACType | SetIsLoadingACType;

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
