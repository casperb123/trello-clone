import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  public darkMode: EventEmitter<boolean> = new EventEmitter();

  public toggleDarkMode(enabled: boolean): void {
    this.darkMode.emit(enabled);
  }

  constructor() {}

  ngOnInit(): void {}
}
