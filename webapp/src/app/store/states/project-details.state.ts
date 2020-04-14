import ProjectDetails from '../models/project-details';

export default class ProjectDetailsState {
    selectedProjectDetails: ProjectDetails;
    projectsDetailsError: Error;
}

export const initializeState = (): ProjectDetailsState => {
    return { selectedProjectDetails: new ProjectDetails(), projectsDetailsError: null };
};