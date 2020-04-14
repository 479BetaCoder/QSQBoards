import { createAction, props } from '@ngrx/store';
import ProjectDetails from '../models/project-details';

export const GetProjectDetails = createAction('[ProjectDetails] - Get Project Details');

export const CreateProjectDetails = createAction(
    '[ProjectDetails] - Create Project Details',
    props<ProjectDetails>()
);

export const SetProjectDetails = createAction(
    '[ProjectDetails] - Update Project Details',
    props<ProjectDetails>()
);

props<ProjectDetails>();
export const BeginGetProjectDetailsAction = createAction('[ProjectDetails] - Begin Get Project Details Action');

export const SuccessGetProjectDetailsAction = createAction(
    '[ProjectDetails] - Success Get Project Details',
    props<{ payload: ProjectDetails }>()
);

export const BeginCreateProjectDetails = createAction(
    '[ProjectDetails] - Begin Create Project Details',
    props<{ payload: ProjectDetails }>()
);

export const SuccessCreateProjectDetails = createAction(
    '[ProjectDetails] - Success Create Project Details',
    props<{ payload: ProjectDetails }>()
);

export const BeginSetProjectDetailsAction = createAction(
    '[ProjectDetails] - Begin Set Project Details Action',
    props<{ payload: ProjectDetails }>()
);
export const SuccessSetProjectDetailsAction = createAction(
    '[ProjectDetails] - Success Set Project Details',
    props<{ payload: ProjectDetails }>()
);

export const ErrorProjectDetailsAction = createAction('[ProjectDetails] - Error', props<Error>());
