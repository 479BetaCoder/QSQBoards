import userStory from './userStory';
import {Observable} from "rxjs";
import UserStory from "./userStory";

export class Column {
  constructor(public name: string, public userStories: UserStory[]) {}
}
