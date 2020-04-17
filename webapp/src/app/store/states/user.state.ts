import User from '../models/user';

export default class UserState {
    activeUsers: Array<User>;
    loggedInUser: User;
    authToken: string;
    userError: Error;
    isUserRegistered: boolean;
}

export const initializeState = (): UserState => { 
    return {
        activeUsers: Array<User>(),
        loggedInUser: null,
        authToken: '',
        userError: null,
        isUserRegistered: false
    };
};