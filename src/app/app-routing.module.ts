import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './modules/authentication/utilities/authenticate.guard';
import { BoardComponent } from './modules/boards/board/board.component';
import { HomeComponent } from './modules/home/home.component';
import { WorkspaceComponent } from './modules/workspaces/workspace/workspace.component';
import { WorkspacesComponent } from './modules/workspaces/workspaces.component';

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
