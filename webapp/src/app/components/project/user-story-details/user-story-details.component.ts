import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-story-details',
  templateUrl: './user-story-details.component.html',
  styleUrls: ['./user-story-details.component.scss']
})
export class UserStoryDetailsComponent implements OnInit {
  updateStoryForm: FormGroup;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}];
  taskTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm();
    this.initiateForm();
    this.touchedRows = [];
    this.taskTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  updateForm() {
    this.updateStoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required, Validators.pattern]],
      storyPoints: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required, Validators.pattern]],
      storyPoints: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.taskTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.taskTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.taskTable.value);
  }

  get getFormControls() {
    const control = this.taskTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.taskTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }
}
