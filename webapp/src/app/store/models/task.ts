export class Task {
  _id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: {
    userName: string,
    image: string
  };
  comments: string[];
}


