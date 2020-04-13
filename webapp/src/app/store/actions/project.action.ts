import { createAction, props } from '@ngrx/store';
import Project from '../models/project';

export const GetProjects = createAction('[Project] - Get Projects');

export const CreateProject = createAction(
    '[Project] - Create Project',
    props<Project>()
);

props<Project>()
export const BeginGetProjectsAction = createAction('[Project] - Begin Get Projects');

export const SuccessGetProjectsAction = createAction(
    '[Project] - Success Get Projects',
    props<{ payload: Project[] }>()
);

export const BeginCreateProject = createAction(
    '[ToDo] - Begin Create Project',
    props<{ payload: Project }>()
);

export const SuccessCreateProject = createAction(
    '[ToDo] - Success Create Project',
);

export const ErrorProjectAction = createAction('[Project] - Error', props<Error>());