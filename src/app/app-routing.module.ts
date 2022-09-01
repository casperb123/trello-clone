import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    loadChildren: () =>
      import('./pages/boards/boards.module').then((m) => m.BoardsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
