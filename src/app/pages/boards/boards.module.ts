import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardEffects } from 'src/app/stores/boards/boards.effects';
import { boardsReducer } from 'src/app/stores/boards/boards.reducer';
import { BoardModule } from './board/board.module';
import { BoardsComponent } from './boards.component';

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    BoardModule,
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardsModule {}
