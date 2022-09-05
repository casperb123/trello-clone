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
import { Workspace } from 'src/app/pages/workspaces/workspace/utilities/workspace.interfaces';
import { ControlType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Color } from '../../board/utilities/board.enums';
import { Board } from '../../board/utilities/board.interfaces';
import { BoardsService } from '../../utilities/boards.service';

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

  constructor(
    private dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private boardsService: BoardsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    private data: { workspace: Workspace; board: Board },
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
    this.colors = Object.keys(Color);
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    // this.createBoardSub = this.boardsService
    //   .createBoard(this.data.workspace, this.title.value)
    //   .subscribe({
    //     next: (board) => {
    //       this.isLoading = false;
    //       this.dialogRef.close();
    //       this.snackBar.open(
    //         `The board "${board.title}" has been created`,
    //         'OK',
    //         {
    //           duration: 5000,
    //         }
    //       );
    //     },
    //     error: (error) => {
    //       this.loadingError = error;
    //       console.log('Error', error);
    //     },
    //   });
  }

  ngOnDestroy(): void {
    if (this.createBoardSub) {
      this.createBoardSub.unsubscribe();
    }
  }
}
