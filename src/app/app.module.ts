import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';
const firebaseConfig = environment.firebase;
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { DataFBService } from './services/data-fb.service';
import { CarDataService } from './services/car-data.service';
import { AuthService } from './services/auth.service';
import { AudioService } from './services/audio.service';
import { UIModule } from './ui/ui.module';
import 'hammerjs';
import { PasSelectorComponent } from './ui/pas-selector/pas-selector.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    UserModule,
    NgxAuthFirebaseUIModule.forRoot(firebaseConfig),
    UIModule,
    MatSelectModule
  ],
  providers: [
    DataFBService,
    CarDataService,
    AuthService,
    PasSelectorComponent,
    AudioService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
