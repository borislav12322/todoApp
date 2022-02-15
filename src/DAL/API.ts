import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const toDoAPI = {
  getToDoLists: (pageSize: number, currentPage: number) =>
    axiosInstance.get(`todos?_limit=${pageSize}&_page=${currentPage}`),
  getToDoListsCount: () => axiosInstance.get('todos'),
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
