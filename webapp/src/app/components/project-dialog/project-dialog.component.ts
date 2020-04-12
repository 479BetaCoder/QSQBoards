import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from '../../models/user';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';


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
    private _projectService: ProjectService, @Inject(MAT_DIALOG_DATA) data) {
    if (data == null) {
      this.dialogTitle = "New Project";
      this._projectService.getAllUsers().subscribe(items => {
        this.allUsers = items;
      })
      this.projectForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        members: new FormControl(null, null),
        status: new FormControl("new", null)
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
    members.forEach(member => memberUserNames.push(member.userName))
    return memberUserNames;
  }

  save() {
    if (this.projectForm.valid) {
      const validMembers = this.modifyMembersValue(this.projectForm.value.members);
      this.projectForm.value.members = validMembers;
      this._projectService.createNewProject(this.projectForm.value)
      if (this.update) {
        this._projectService.updateProject(this.projectForm.value, this.projectId)
          .subscribe(
            data => {
              console.log(data);
            },
            error => { }
          );
      } else {
        this._projectService.createNewProject(this.projectForm.value)
          .subscribe(
            (_data) => {
              this.dialogRef.close();
            },
            error => { }
          );
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
