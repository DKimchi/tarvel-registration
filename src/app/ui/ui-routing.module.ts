import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFromComponent } from './main-from/main-from.component';
import { MainFromGuard } from './main-from/main-from-guard.guard';
import { NewConstTripComponent } from './new-const-trip/new-const-trip.component';
import { AddCarDetailComponent } from './add-car-detail/add-car-detail.component';
import { AddOccCarComponent } from './add-occ-car/add-occ-car.component';

const routes: Routes = [
  {
    path: 'main-from',
    component: MainFromComponent,
    canActivate: [MainFromGuard]
  },
  {
    path: 'new-const-trip',
    component: NewConstTripComponent,
    canActivate: [MainFromGuard],
    children: [{ path: ':name', component: NewConstTripComponent }]
  },
  {
    path: 'add-car-detail',
    component: AddCarDetailComponent,
    canActivate: [MainFromGuard],
    children: [{ path: ':name', component: AddCarDetailComponent }]
  },
  {
    path: 'add-occ-car',
    component: AddOccCarComponent,
    canActivate: [MainFromGuard],
    children: [{ path: ':name', component: AddCarDetailComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UIRoutingModule {}
