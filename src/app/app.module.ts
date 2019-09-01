import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';

import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';
const firebaseConfig = environment.firebase;
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { DataFBService } from './services/data-fb.service';
import { CarDataService } from './services/car-data.service';
import { AuthService } from './services/auth.service';
import { AudioService } from './services/audio.service';
import { MessagingService } from './services/messaging.service';
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
    AngularFirePerformanceModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    UserModule,
    NgxAuthFirebaseUIModule.forRoot(firebaseConfig),
    UIModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [
    DataFBService,
    CarDataService,
    AuthService,
    PasSelectorComponent,
    AudioService,
    MessagingService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
