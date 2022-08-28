import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/pages/authentication/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });
  }

  ngOnInit(): void {}
}
