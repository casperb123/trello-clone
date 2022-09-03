import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardModule } from './board/board.module';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { CreateBoardDialogComponent } from './components/create-board-dialog/create-board-dialog.component';
import { BoardEffects } from './store/boards.effects';
import { boardsReducer } from './store/boards.reducer';
import { BoardsInterceptor } from './utilities/boards.interceptor';

@NgModule({
  declarations: [BoardsComponent, CreateBoardDialogComponent],
  imports: [
    BoardsRoutingModule,
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    BoardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BoardsInterceptor,
      multi: true,
    },
  ],
})
export class BoardsModule {}
