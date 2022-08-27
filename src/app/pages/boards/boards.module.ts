import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardEffects } from 'src/app/stores/boards/boards.effects';
import { reducer } from 'src/app/stores/boards/boards.reducer';
import { BoardsComponent } from './boards.component';

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    StoreModule.forRoot({ boards: reducer }),
    EffectsModule.forRoot([BoardEffects]),
    MatCardModule,
    RouterModule,
  ],
})
export class BoardsModule {}
