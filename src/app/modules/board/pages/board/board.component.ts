import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Board } from '../../utilities/board.models';
import { BoardService } from '../../utilities/board.service';

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
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const workspaceId = params.get('workspaceId');
    const boardId = params.get('boardId');

    this.board$ = this.boardService.getBoardById(boardId, workspaceId);
  }

  ngOnDestroy(): void {
    if (this.workspaceSub) {
      this.workspaceSub.unsubscribe();
    }
  }
}
