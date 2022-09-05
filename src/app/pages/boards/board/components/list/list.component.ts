import { Component, Input, OnInit } from '@angular/core';
import { List } from './utilities/list.models';

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
