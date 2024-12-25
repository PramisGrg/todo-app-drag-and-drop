export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export type UpdateTodoParams = {
  status: string;
  id: string;
};
