import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsModule } from '../boards/boards.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, BoardsModule, WorkspacesModule],
})
export class LandingModule {}
