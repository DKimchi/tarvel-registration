import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, UserRoutingModule],
  exports: [LoginComponent],
  entryComponents: [LoginComponent]
})
export class UserModule {}
