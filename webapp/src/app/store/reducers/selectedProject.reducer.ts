import { Action, createReducer, on } from '@ngrx/store';
import * as SelectedProjectActions from '../actions/selectedProject.action';
import Project from '../models/project';
import SelectedProjectState, { initializeState } from '../states/selectedProject.state';

export const intialState = initializeState();

const reducer = createReducer(
    intialState,
    on(SelectedProjectActions.GetSelectedProject, state => state),
    on(SelectedProjectActions.CreateSelectedProject, (state: SelectedProjectState, selectedProject: Project) => {
        return { ...state, selectedProject: state.selectedProject, projectsError: null };
    }),
    on(SelectedProjectActions.SuccessGetSelectedProjectsAction, (state: SelectedProjectState, { payload }) => {
        return { ...state, selectedProject: payload };
    }),
    on(SelectedProjectActions.SuccessCreateSelectedProject, (state: SelectedProjectState, { payload }) => {
        return { ...state, selectedProject:state.selectedProject, payload, projectsError: null };
    }),
    on(SelectedProjectActions.ErrorProjectAction, (state: SelectedProjectState, error: Error) => {
        console.log(error);
        return { ...state, projectsError: error };
    })
);

export function SelectedProjectReducer(state: SelectedProjectState | undefined, action: Action) {
    return reducer(state, action);
}