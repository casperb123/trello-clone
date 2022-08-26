import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule, MatButtonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
