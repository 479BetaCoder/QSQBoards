import { User } from '../store/models/User';

export class BacklogItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  storyPoints: string;
  assignee: User;
  type: string;
}