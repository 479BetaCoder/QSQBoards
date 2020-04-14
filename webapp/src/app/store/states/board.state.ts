import UserStory from '../models/userStory';

export default class BoardState {
  userStories: Array<UserStory>;
  userStoriesError: Error;
}

export const initializeState = (): BoardState => {
  return { userStories: Array<UserStory>(), userStoriesError: null };
};
