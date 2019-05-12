import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { UIRoutingModule } from './ui-routing.module';
import { MainFromComponent } from './main-from/main-from.component';
import { CarSelectorComponent } from './car-selector/car-selector.component';
import { PasSelectorComponent } from './pas-selector/pas-selector.component';
import { EndTripComponent } from './end-trip/end-trip.component';
import { StartKmComponent } from './start-km/start-km.component';
import { CarPickrComponent } from './car-pickr/car-pickr.component';
import { PasPickrComponent } from './pas-pickr/pas-pickr.component';
import { BillPickrComponent } from './bill-pickr/bill-pickr.component';
import { NewConstTripComponent } from './new-const-trip/new-const-trip.component';
import { DeleteConstTripComponent } from './delete-const-trip/delete-const-trip.component';
import { AddCarDetailComponent } from './add-car-detail/add-car-detail.component';
import { AddOccCarComponent } from './add-occ-car/add-occ-car.component';

@NgModule({
  declarations: [
    MainFromComponent,
    CarSelectorComponent,
    PasSelectorComponent,
    EndTripComponent,
    StartKmComponent,
    CarPickrComponent,
    BillPickrComponent,
    PasPickrComponent,
    NewConstTripComponent,
    DeleteConstTripComponent,
    AddCarDetailComponent,
    AddOccCarComponent
  ],
  imports: [
    CommonModule,
    UIRoutingModule,
    MatCardModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    CarPickrComponent,
    BillPickrComponent,
    PasPickrComponent,
    DeleteConstTripComponent
  ],
  exports: [AddOccCarComponent]
})
export class UIModule {}
