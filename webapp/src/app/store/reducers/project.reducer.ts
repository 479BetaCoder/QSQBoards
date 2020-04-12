import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from '../actions/project.action';
import Project from '../models/project';
import ProjectState, { initializeState } from '../states/project.state';

export const intialState = initializeState();

const reducer = createReducer(
    intialState,
    on(ProjectActions.GetProjects, state => state),
    on(ProjectActions.CreateProject, (state: ProjectState, project: Project) => {
        return { ...state, projects: [...state.projects, project], projectsError: null };
    }),
    on(ProjectActions.SuccessGetProjectsAction, (state: ProjectState, { payload }) => {
        return { ...state, projects: payload };
    }),
    on(ProjectActions.SuccessCreateProject, (state: ProjectState) => {
        return { ...state, projects: [...state.projects], projectsError: null };
    }),
    on(ProjectActions.ErrorProjectAction, (state: ProjectState, error: Error) => {
        console.log(error);
        return { ...state, projectsError: error };
    })
);

export function ProjectReducer(state: ProjectState | undefined, action: Action) {
    return reducer(state, action);
}