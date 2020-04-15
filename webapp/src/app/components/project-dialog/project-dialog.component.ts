import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import User from '../../store/models/user';
import { ProjectService } from '../../services/project.service';
import Project from '../../store/models/project';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';



// States
import UserState from 'app/store/states/user.state';
import ProjectState from '../../store/states/project.state';


// Actions
import * as ProjectActions from '../../store/actions/project.action';



@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {
  emptyImgUrl: string = '../../../assets/blank-profile-picture.png';
  projectForm: FormGroup;
  allUsers: User[];
  members = new FormControl([]);
  searchTerm: string;
  dialogTitle: string;
  update: boolean;
  projectId: string;

  activeUsers: UserState;
  ActiveUserSubscription: Subscription;
  projectList: Project[] = [];
  projectsError: Error = null;
  userError: Error = null;
  selectedUsers: string[] = [];
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ProjectDialogComponent>,
    private _projectService: ProjectService, @Inject(MAT_DIALOG_DATA) data,
    private store: Store<{ projects: ProjectState, user: UserState }>
  ) {
    store.pipe(select('user'), take(1)).subscribe(
      s => this.allUsers = s.activeUsers
    );
    if (data == null) {
      this.dialogTitle = "New Project";
      this.projectForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        members: this.members,
        status: new FormControl("NEW", null)
      });
    } else {
      this.dialogTitle = "Update Project";
      this.update = true;
      this.projectId = data["id"];
      this.projectForm = new FormGroup({
        title: new FormControl(data["title"], Validators.required),
        description: new FormControl(data["description"], Validators.required),
        members: new FormControl(data["members"], null),
        status: new FormControl(data["status"], null)
      });
    }
  }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.projectForm.get(controlName).invalid && this.projectForm.get(controlName).touched;
  }

  onMemberRemoved(member: User) {
    const members = this.members.value as User[];
    this.removeFirst(members, member);
    this.members.setValue(members); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  modifyMembersValue(members) {
    let memberUserNames = [];
    if (members.length > 0) {
      members.forEach(member => memberUserNames.push(member.userName))
    }
    return memberUserNames;
  }

  createProject(newProject) {
    const project: Project = newProject;

    // assign owner from session. 
    const loggedInUser = JSON.parse(sessionStorage.getItem('User'));
    project.owner = loggedInUser.userName;
    this.store.dispatch(ProjectActions.BeginCreateProject({ payload: project }));
    this.dialogRef.close();
  }

  save() {
    if (this.projectForm.valid) {

      const validMembers = this.modifyMembersValue(this.projectForm.value.members);
      this.projectForm.value.members = validMembers;

      if (this.update) {
        this._projectService.updateProject(this.projectForm.value, this.projectId)
          .subscribe(
            data => {
              console.log(data);
            },
            error => { }
          );
      } else {
        this.createProject(this.projectForm.value)
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSelectClose() {
    this.searchTerm = "";
  }

   change(event)
  {
    if(event.isUserInput) {

  //     console.log(event.source.value, event.source.selected);
  //     if(event.source.selected){
  //       this.members.push(event.source.value.userName);
  //     }
  //     if(!event.source.selected){
  //       this.selectedUsers = this.selectedUsers.filter((item) => item !== event.source.value.userName);
  //     }
     }
    
   }
}
