import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/pages/login/login.component';
import { RegisterComponent } from './modules/authentication/pages/register/register.component';
import { AuthenticateGuard } from './modules/authentication/utilities/authenticate.guard';
import { BoardComponent } from './modules/board/pages/board/board.component';
import { HomeComponent } from './modules/home/pages/home.component';
import { WorkspaceComponent } from './modules/workspace/pages/workspace/workspace.component';
import { WorkspacesComponent } from './modules/workspace/pages/workspaces/workspaces.component';

const routes: Routes = [
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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
