import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardComponent } from './components/board/board.component';
import { BoardEffects } from './store/boards.effects';
import { reducer } from './store/boards.reducer';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    StoreModule.forRoot({ board: reducer }),
    EffectsModule.forRoot([BoardEffects]),
  ],
})
export class BoardsModule {}
