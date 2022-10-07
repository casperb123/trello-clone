import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Color } from '../../utilities/board.enums';
import { Board } from '../../utilities/board.models';
import { BoardService } from '../../utilities/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  private bpoSub: Subscription;
  private breakpoints = {
    ['(max-width: 380px)']: 1,
    ['(max-width: 590px)']: 2,
    ['(max-width: 770px)']: 3,
    ['(max-width: 940px)']: 4,
    ['(min-width: 941px)']: 5,
  };

  public dialogType = DialogType;
  public gridColumns = 5;
  public boards$: Observable<Board[]>;

  @Input()
  public workspace: Workspace;

  constructor(
    public appService: AppService,
    private bpo: BreakpointObserver,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.bpoSub = this.bpo
      .observe(Object.keys(this.breakpoints))
      .subscribe((result) => {
        const active = Object.keys(result.breakpoints).find(
          (breakpoint) => result.breakpoints[breakpoint]
        );
        this.gridColumns = this.breakpoints[active];
      });

    this.boards$ = this.boardService.getBoardsInWorkspace(this.workspace.id);
  }

  public openCreateBoardDialog(): void {
    this.appService.openDialog(DialogType.CreateBoard, {
      workspace: this.workspace,
    });
  }

  public getColor(board: Board): string {
    return Color[board.backgroundColor];
  }

  ngOnDestroy(): void {
    if (this.bpoSub) {
      this.bpoSub.unsubscribe();
    }
  }
}
