import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ControlType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { WorkspaceService } from '../../utilities/workspace.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss'],
})
export class CreateWorkspaceComponent implements OnInit {
  public form: FormGroup;
  public controlType = ControlType;
  public isLoading: boolean;
  public loadingError: any;

  public get title(): AbstractControl {
    return this.form.get('title');
  }

  public get description(): AbstractControl {
    return this.form.get('description');
  }

  constructor(
    private dialogRef: MatDialogRef<CreateWorkspaceComponent>,
    private workspaceService: WorkspaceService,
    private snackBar: MatSnackBar,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.workspaceService
      .createWorkspace(this.title.value, this.description.value)
      .pipe(take(1))
      .subscribe({
        next: (workspace) => {
          this.isLoading = false;
          this.dialogRef.close();
          this.snackBar.open(
            `The workspace "${workspace.title}" has been created`,
            'OK',
            {
              duration: 5000,
            }
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.loadingError = error;
          console.log('Create workspace error', error);
        },
      });
  }
}
