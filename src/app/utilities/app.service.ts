import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginDialogComponent } from '../modules/authentication/components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../modules/authentication/components/register-dialog/register-dialog.component';
import { CreateBoardDialogComponent } from '../modules/board/components/create-board-dialog/create-board-dialog.component';
import { CreateWorkspaceComponent } from '../modules/workspace/components/create-workspace/create-workspace.component';
import { ControlType, DialogType } from './app.enums';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // this.matIconRegistry.addSvgIcon(
    //   'plus',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl(
    //     'src/app/assets/plus-icon.svg'
    //   )
    // );
  }

  public openDialog(dialogType: DialogType, data?: {}): void {
    let component: ComponentType<any>;
    switch (dialogType) {
      case DialogType.Login:
        component = LoginDialogComponent;
        break;
      case DialogType.Register:
        component = RegisterDialogComponent;
        break;
      case DialogType.CreateWorkspace:
        component = CreateWorkspaceComponent;
        break;
      case DialogType.CreateBoard:
        component = CreateBoardDialogComponent;
        break;
    }

    this.dialog.open(component, {
      width: '450px',
      data: data,
    });
  }

  public getFormValidationError(
    control: AbstractControl,
    controlType: ControlType
  ): string {
    if (control.hasError('required')) {
      return `The ${controlType} can't be empty`;
    }

    if (control.hasError('minlength')) {
      return `The ${controlType} must be atleast 6 characters`;
    }

    if (control.hasError('email')) {
      return 'Not a valid email';
    }

    if (control.hasError('min') || control.hasError('max')) {
      return `The ${controlType} must be between 0 and 255`;
    }

    return '';
  }
}
