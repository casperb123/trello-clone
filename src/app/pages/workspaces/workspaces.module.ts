import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardsModule } from '../boards/boards.module';
import { CreateWorkspaceComponent } from './components/create-workspace/create-workspace.component';
import { WorkspacesEffects } from './store/workspaces.effects';
import { workspacesReducer } from './store/workspaces.reducer';
import { WorkspacesComponent } from './workspaces.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    BoardsModule,
    MatDialogModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    StoreModule.forFeature('workspaces', workspacesReducer),
    EffectsModule.forFeature([WorkspacesEffects]),
  ],
  declarations: [WorkspacesComponent, CreateWorkspaceComponent],
  exports: [WorkspacesComponent],
})
export class WorkspacesModule {}
