import {createReducer, on} from '@ngrx/store';
import * as BoardActions from '../actions/board.action';
import BoardState, {initializeState} from '../states/board.state';
import UserStory from '../../models/userStory';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(BoardActions.GetAllUserStories, state => state),
  on(BoardActions.CreateUserStoryAction, (state: BoardState, userStory: UserStory) => {
    return { ...state, userStories: [...state.userStories, userStory], userStoriesError: null };
  }),
  on(BoardActions.GetAllUserStoriesAction, (state: BoardState, { payload }) => {
    return { ...state, projects: payload };
  }),
  /*on(BoardActions.SuccessCreateUserStory, (state: BoardState, { payload }) => {
    return { ...state, projects: [...state.projects, payload], projectsError: null };
  }),*/
  on(BoardActions.ErrorUserStoryAction, (state: BoardState, error: Error) => {
    console.log(error);
    return { ...state, userStoriesError: error };
  })
);
