import { User } from "./User";

export default class Project {
    _id: string;
    title: string;
    owner: User;
    description: string;
    members?: User[];
    status: string;
}