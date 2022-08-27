import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/pages/board/components/list/list.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input()
  public list: List;

  constructor() {}

  ngOnInit(): void {}
}
