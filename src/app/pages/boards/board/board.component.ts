import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BoardsService } from '../utilities/boards.service';
import { Board } from './utilities/board.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private workspaceSub: Subscription;
  public board$: Observable<Board>;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const workspaceId = params.get('workspaceId');
    const boardId = params.get('boardId');

    this.board$ = this.boardsService.getBoardById(boardId, workspaceId);
  }

  ngOnDestroy(): void {
    if (this.workspaceSub) {
      this.workspaceSub.unsubscribe();
    }
  }
}
