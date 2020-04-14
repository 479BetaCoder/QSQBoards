import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {baseURL} from '../shared/baseurl';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as BoardActions from '../store/actions/board.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import UserStory from '../store/models/userStory';
import * as ProjectActions from '../store/actions/project.action';
import {Injectable} from '@angular/core';

@Injectable()
export class BoardEffects {
  constructor(private http: HttpClient, private action$: Actions) {
  }
  private baseUrlBoard: string = baseURL + '/user-stories';

  getAllUserStories$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.BeginGetUserStoriesAction),
      mergeMap(action =>
        this.http.get(this.baseUrlBoard + '/' + action.projectId).pipe(
          map((data: UserStory[]) => {
            return BoardActions.SuccessGetAllUserStoriesAction({ payload: data});
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
        this.http.post(this.baseUrlBoard + '/' + action.projectId, JSON.stringify(action.payload))
          .pipe(
            map(() => {
              return BoardActions.SuccessCreateUserStory({ payload: action.payload });
            }),
            catchError((error: Error) => {
              return of(ProjectActions.ErrorProjectAction(error));
            })
          )
      )
    )
  );

  UpdateUserStory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.BeginUpdateUserStory),
      mergeMap(action =>
        this.http.put(this.baseUrlBoard + '/' + action.storyId, JSON.stringify(action.payload))
          .pipe(
            map(() => {
              return BoardActions.SuccessUpdateStory({ payload: action.payload });
            }),
            catchError((error: Error) => {
              return of(ProjectActions.ErrorProjectAction(error));
            })
          )
      )
    )
  );

  DeleteUserStory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.BeginDeleteUserStory),
      mergeMap(action =>
        this.http.delete(this.baseUrlBoard + '/' + action.storyId)
          .pipe(
            map(() => {
              return BoardActions.SuccessDeleteStory({ storyId: action.storyId });
            }),
            catchError((error: Error) => {
              return of(ProjectActions.ErrorProjectAction(error));
            })
          )
      )
    )
  );
}
