import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from './profile/profile.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'child', component: ProfileComponent, canActivate: [ProfileGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
    children: [{ path: ':firstTime', component: ProfileComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class UserRoutingModule {}
