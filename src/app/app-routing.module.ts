import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './pages/authentication/utilities/authenticate.guard';
import { BoardComponent } from './pages/boards/board/board.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkspaceComponent } from './pages/workspaces/workspace/workspace.component';
import { WorkspacesComponent } from './pages/workspaces/workspaces.component';

let routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'workspaces',
    component: WorkspacesComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'workspaces/:id',
    component: WorkspaceComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'workspaces/:workspaceId/:boardId',
    component: BoardComponent,
    canActivate: [AuthenticateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
