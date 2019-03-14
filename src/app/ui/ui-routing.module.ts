import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFromComponent } from './main-from/main-from.component';

const routes: Routes = [{ path: 'main-from', component: MainFromComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UIRoutingModule {}
