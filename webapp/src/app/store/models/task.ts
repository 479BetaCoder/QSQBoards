import User from './user';

export class Task {
  _id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: User
  comment: string[];
}


