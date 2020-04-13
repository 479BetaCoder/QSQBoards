import { createAction, props } from '@ngrx/store';
import Project from '../models/project';

export const GetSelectedProject = createAction('[Project] - Get Selected Project');

export const CreateSelectedProject = createAction(
    '[Project] - Create Selected Project',
    props<Project>()
);

props<Project>();
export const BeginGetSelectedProjectsAction = createAction('[Project] - Begin Get Selected Project');

export const SuccessGetSelectedProjectsAction = createAction(
    '[Project] - Success Get Selected Project',
    props<{ payload: Project }>()
);

export const BeginCreateSelectedProject = createAction(
    '[Project] - Begin Create Selected Project',
    props<{ payload: Project }>()
);

export const SuccessCreateSelectedProject = createAction(
    '[Project] - Success Create Selected Project',
    props<{ payload: Project }>()
);

export const ErrorProjectAction = createAction('[Project] - Error', props<Error>());
