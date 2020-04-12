import {User} from "./User";

export class Project {
    ProjectId : string;
    Title : string;
    Owner : User;
    Description: string;
    Members? : User[];
    Status : string;
}