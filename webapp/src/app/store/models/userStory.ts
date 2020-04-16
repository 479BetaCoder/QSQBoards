import { User } from './User';

export class UserStory {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  storyPoints: string;
  assignee: User;
}