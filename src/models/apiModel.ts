import { Todo } from './model';

export interface IGetResponse {
  todos: Todo[];
  toRemoves: Todo[];
}
