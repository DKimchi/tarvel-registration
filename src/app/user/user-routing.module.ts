import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class UserRoutingModule {}
