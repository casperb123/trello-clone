import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BoardComponent } from './board.component';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [CardComponent, ListComponent, BoardComponent],
  imports: [CommonModule, MatCardModule],
})
export class BoardModule {}
