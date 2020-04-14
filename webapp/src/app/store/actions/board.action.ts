import { createAction, props } from '@ngrx/store';
import UserStory from '../../models/userStory';

export const GetAllUserStories = createAction('[UserStory] - Get UserStories');

export const CreateUserStoryAction = createAction(
  '[UserStory] - Create UserStory',
  props<UserStory>()
);

props<UserStory>();
export const BeginGetUserStoriesAction = createAction(
  '[UserStory] - Begin Get UserStories',
  props<{ projectId: string }>()
  );

export const SuccessGetAllUserStoriesAction = createAction(
  '[UserStory] - Success Get UserStories',
  props<{ payload: UserStory[] }>()
);

export const BeginCreateUserStory = createAction(
  '[UserStory] - Begin Create UserStory',
  props<{ payload: UserStory }>()
);

export const SuccessCreateUserStory = createAction(
  '[UserStory] - Success Create UserStory',
  props<{ payload: UserStory }>()
);

export const ErrorUserStoryAction = createAction('[UserStory] - Error', props<Error>());
