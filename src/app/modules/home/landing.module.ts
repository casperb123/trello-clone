import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsModule } from '../boards/boards.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, BoardsModule, WorkspacesModule],
})
export class LandingModule {}
