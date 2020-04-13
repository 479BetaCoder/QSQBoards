import Project from '../models/project';

export default class SelectedProjectState {
    selectedProject: Project;
    projectsError: Error;
}

export const initializeState = (): SelectedProjectState => {
    return { selectedProject: new Project(), projectsError: null };
};