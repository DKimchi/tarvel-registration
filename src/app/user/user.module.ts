import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './login/login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [LoginComponent, LoginDialogComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    MatSelectModule,
    NgxAuthFirebaseUIModule
  ],
  exports: [LoginComponent],
  entryComponents: [LoginComponent, LoginDialogComponent, ProfileComponent]
})
export class UserModule {}
