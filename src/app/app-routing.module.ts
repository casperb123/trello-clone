import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { LandingComponent } from './pages/landing/landing.component';

let routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'boards',
    component: BoardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
