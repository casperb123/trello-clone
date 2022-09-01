import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { BoardsComponent } from './boards.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BoardsComponent,
  },
  {
    path: ':id',
    component: BoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
