import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogType } from './app.enums';
import { LoginDialogComponent } from './pages/authentication/components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './pages/authentication/components/register-dialog/register-dialog.component';
import { CreateBoardDialogComponent } from './pages/boards/components/create-board-dialog/create-board-dialog.component';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private dialog: MatDialog) {}

  public openDialog(dialogType: DialogType): void {
    let component: ComponentType<any>;
    switch (dialogType) {
      case DialogType.Login:
        component = LoginDialogComponent;
        break;
      case DialogType.Register:
        component = RegisterDialogComponent;
        break;
      case DialogType.CreateBoard:
        component = CreateBoardDialogComponent;
        break;
    }

    this.dialog.open(component, {
      width: '450px',
    });
  }
}
