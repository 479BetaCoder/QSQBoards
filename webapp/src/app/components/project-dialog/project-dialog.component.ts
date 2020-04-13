import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from '../../store/models/user';
import { ProjectService } from '../../services/project.service';
import * as ProjectActions from '../../store/actions/project.action';
import Project from '../../store/models/project';
import ProjectState from '../../store/states/project.state';
import { Store } from '@ngrx/store';


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

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ProjectDialogComponent>,
    private _projectService: ProjectService, @Inject(MAT_DIALOG_DATA) data,
    private store: Store<{ projects: ProjectState }>
  ) {
    if (data == null) {
      this.dialogTitle = "New Project";
      this._projectService.getAllUsers().subscribe(items => {
        this.allUsers = items;
      })
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
      this._projectService.getAllUsers().subscribe(items => {
        this.allUsers = items;
      })
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

  createProject(project) {
    const todo: Project = project;
    this.store.dispatch(ProjectActions.BeginCreateProject({ payload: todo }));
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

  onSelectClose(){
    this.searchTerm = "";
  }
}
