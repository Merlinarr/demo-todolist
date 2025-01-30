export interface Result<T = any> {
  status: number;
  code: string;
  data: T;
}

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export type CreateTodoRequest = {
  title: string;
  completed?: boolean;
};

export type UpdateTodoRequest = {
  title?: string;
  completed?: boolean;
};

export type TodoResponse = Todo;