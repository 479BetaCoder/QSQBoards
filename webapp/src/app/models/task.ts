import {User} from "./User";

export class Task {
    title : string;
    description : string;
    comments?: [
        {
          text: String,
          postedBy: User
        }
      ];
    status : string;
    priority: number;
    storyId: string;
    assignee: User;
}