import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos/',
});

export const toDoAPI = {
  getToDoLists: () => axiosInstance.get(''),
};
