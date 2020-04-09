import {User} from "./User";

export interface Project {
    ProjectId : string;
    Title : string;
    Owner : User;
    Description: string,
    Members? : User[];
    Status : string;
}