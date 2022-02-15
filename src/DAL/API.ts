import axios from 'axios';
import { ToDoListType } from '../BLL/appReducer';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const toDoAPI = {
  getToDoLists: (pageSize: number, currentPage: number) =>
    axiosInstance.get<ResponseType>(`todos?_limit=${pageSize}&_page=${currentPage}`),
  getToDoListsCount: () => axiosInstance.get<ResponseType>('todos'),
  changeToDoListStatus: (id: number, completed: boolean) =>
    axiosInstance.put(`todos/${id}`, { completed }),
  changeToDoListTitle: (id: number, title: string) =>
    axiosInstance.put(`todos/${id}`, { title }),
  removeToDoList: (id: number) => axiosInstance.delete(`todos/${id}`),
  addNewToDoList: (title: string) =>
    axiosInstance.post('todos', {
      title,
    }),
};

type ResponseType = ToDoListType[];
