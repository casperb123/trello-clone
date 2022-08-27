import { List } from './components/list/list.interface';

export interface Board {
  id: string;
  title: string;
  lists: List[];
}
