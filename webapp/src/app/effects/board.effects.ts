import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {baseURL} from '../shared/baseurl';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as BoardActions from '../store/actions/board.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import UserStory from '../models/userStory';
import * as ProjectActions from '../store/actions/project.action';


export class BoardEffects {
  constructor(private http: HttpClient, private action$: Actions) {
  }
  private baseUrlBoard: string = baseURL + '/user-stories';

  GetAllUserStories$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.BeginGetUserStoriesAction),
      mergeMap(action =>
        this.http.get(this.baseUrlBoard).pipe(
          map((data: UserStory[]) => {
            return BoardActions.SuccessGetAllUserStoriesAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(BoardActions.ErrorUserStoryAction(error));
          })
        )
      )
    )
  );

  CreateUserStory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.BeginCreateUserStory),
      mergeMap(action =>
        this.http
          .post(this.baseUrlBoard, JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((_data) => {
              return BoardActions.SuccessCreateUserStory({ payload: action.payload });
            }),
            catchError((error: Error) => {
              return of(ProjectActions.ErrorProjectAction(error));
            })
          )
      )
    )
  );
}
