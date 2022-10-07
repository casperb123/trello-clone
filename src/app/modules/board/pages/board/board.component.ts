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
    const boardId = params.get('id');

    this.board$ = this.boardService.getBoardById(boardId);
  }

  ngOnDestroy(): void {
    if (this.workspaceSub) {
      this.workspaceSub.unsubscribe();
    }
  }
}
