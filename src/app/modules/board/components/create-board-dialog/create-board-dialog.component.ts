import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';
import { ControlType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Color } from '../../utilities/board.enums';
import { BoardService } from '../../utilities/board.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit, OnDestroy {
  private createBoardSub: Subscription;

  public form: FormGroup;
  public controlType = ControlType;
  public isLoading: boolean;
  public loadingError: any;
  public colors: string[];

  public get title(): AbstractControl {
    return this.form.get('title');
  }

  public get backgroundColor(): AbstractControl {
    return this.form.get('backgroundColor');
  }

  constructor(
    private dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private boardService: BoardService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    private data: { workspace: Workspace },
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      backgroundColor: new FormControl('Gray'),
    });
    this.colors = Object.keys(Color);
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    console.log('Workspace', this.data.workspace);

    this.createBoardSub = this.boardService
      .createBoard(
        this.data.workspace.id,
        this.title.value,
        this.backgroundColor.value
      )
      .subscribe((board) => {
        this.dialogRef.close();
        this.snackBar.open(
          `The board "${board.title}" has been created`,
          'OK',
          {
            duration: 5000,
          }
        );
      });
  }

  ngOnDestroy(): void {
    if (this.createBoardSub) {
      this.createBoardSub.unsubscribe();
    }
  }
}
