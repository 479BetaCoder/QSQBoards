import userStory from './userStory';
import {Observable} from "rxjs";

export class Column {
  constructor(public name: string, public userStories: Observable<any>) {}
}
