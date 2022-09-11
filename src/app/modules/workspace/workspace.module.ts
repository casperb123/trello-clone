import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { BoardModule } from '../board/board.module';
import { CreateWorkspaceComponent } from './components/create-workspace/create-workspace.component';
import { WorkspacesComponent } from './pages/workspaces/workspaces.component';
import { WorkspaceEffects } from './store/workspace.effects';
import { workspaceReducer } from './store/workspace.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    BoardModule,
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
    HttpClientModule,
    StoreModule.forFeature('workspaces', workspaceReducer),
    EffectsModule.forFeature([WorkspaceEffects]),
  ],
  declarations: [WorkspacesComponent, CreateWorkspaceComponent],
  exports: [WorkspacesComponent],
})
export class WorkspaceModule {}
