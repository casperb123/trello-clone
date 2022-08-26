import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsModule } from '../boards/boards.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, BoardsModule],
})
export class LandingModule {}
