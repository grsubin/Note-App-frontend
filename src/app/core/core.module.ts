import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreComponent } from './core.component';
import { NotesModule } from '../notes/notes.module';
import { UserModule } from '../user/user.module';
import { CoreRoutingModule } from './core-routing.module';
import { ClickOutsideDirective } from './_directive/clickOutside.directive';

@NgModule({
  declarations: [NavbarComponent, CoreComponent, ClickOutsideDirective],
  imports: [CommonModule, CoreRoutingModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
