import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, Subscription } from 'rxjs';
import { ControlType } from 'src/app/app.enums';
import { AppService } from 'src/app/app.service';
import { BoardsService } from '../../boards.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit, OnDestroy {
  private isLoadedSub: Subscription;

  public form: FormGroup;
  public controlType = ControlType;
  public isLoading$: Observable<boolean>;
  public loadingError$: Observable<any>;

  public get title(): AbstractControl {
    return this.form.get('title');
  }

  constructor(
    private dialogRef: MatDialogRef<CreateBoardDialogComponent>,
    private boardsService: BoardsService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
    this.isLoading$ = this.boardsService.getCreateIsLoading();
    this.loadingError$ = this.boardsService.getCreateLoadingError();
    this.isLoadedSub = this.boardsService
      .getCreateIsLoaded()
      .pipe(filter((isLoaded) => isLoaded))
      .subscribe(() => {
        this.dialogRef.close();
        this.boardsService.resetCreateState();
      });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.boardsService.createBoard(this.title.value);
  }

  ngOnDestroy(): void {
    if (this.isLoadedSub) {
      this.isLoadedSub.unsubscribe();
    }
  }
}
