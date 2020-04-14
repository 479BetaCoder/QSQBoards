import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectDetailsActions from '../actions/project-details.action';
import ProjectDetails from '../models/project-details';
import ProjectDetailsState, { initializeState } from '../states/project-details.state';

export const intialState = initializeState();

const reducer = createReducer(
    intialState,
    on(ProjectDetailsActions.GetProjectDetails, state => state),
    on(ProjectDetailsActions.CreateProjectDetails, (state: ProjectDetailsState, projectDetails: ProjectDetails) => {
        return { ...state, selectedProjectDetails: projectDetails, projectDetailsError: null };
    }),
    on(ProjectDetailsActions.SetProjectDetails, (state: ProjectDetailsState, projectDetails: ProjectDetails) => {
        return { ...state, selectedProjectDetails: projectDetails, projectDetailsError: null };
    }),
    on(ProjectDetailsActions.SuccessGetProjectDetailsAction, (state: ProjectDetailsState, { payload }) => {
        return { ...state, selectedProject: payload };
    }),
    on(ProjectDetailsActions.SuccessCreateProjectDetails, (state: ProjectDetailsState, { payload }) => {
        return { ...state, selectedProject: payload, projectDetailsError: null };
    }),
    on(ProjectDetailsActions.SuccessSetProjectDetailsAction, (state: ProjectDetailsState, { payload }) => {
        return { ...state, selectedProject: payload };
    }),
    on(ProjectDetailsActions.ErrorProjectDetailsAction, (state: ProjectDetailsState, error: Error) => {
        console.log(error);
        return { ...state, projectDetailsError: error };
    })
);

export function ProjectDetailsReducer(state: ProjectDetailsState | undefined, action: Action) {
    return reducer(state, action);
}