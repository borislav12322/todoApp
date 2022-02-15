import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos',
});

export const toDoAPI = {
  getToDoLists: (pageSize: number, currentPage: number) =>
    axiosInstance.get(`?_limit=${pageSize}&_page=${currentPage}`),
  getToDoListsCount: () => axiosInstance.get(''),
};
