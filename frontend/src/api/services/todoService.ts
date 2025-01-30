import apiClient from '../apiClient';
import type { CreateTodoRequest, UpdateTodoRequest, TodoResponse } from '../../common/types';

export enum TodoApi {
  GET_TODOS = '/tasks',
  CREATE_TODO = '/tasks',
  UPDATE_TODO = '/tasks/:id',
  DELETE_TODO = '/tasks/:id',
}

const getTodos = () => 
  apiClient.get<Array<TodoResponse>>({ url: TodoApi.GET_TODOS });

const createTodo = (data: CreateTodoRequest) => 
  apiClient.post<TodoResponse>({ url: TodoApi.CREATE_TODO, data });

const updateTodo = (id: string, data: UpdateTodoRequest) => 
  apiClient.patch<TodoResponse>({ 
    url: TodoApi.UPDATE_TODO.replace(':id', id), 
    data 
  });

const deleteTodo = (id: string) => 
  apiClient.delete({ url: TodoApi.DELETE_TODO.replace(':id', id) });

export default {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
}; 