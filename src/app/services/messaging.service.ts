import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from './auth.service';
import { DataFBService } from './data-fb.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAEojdtw4:APA91bGWUt8sBBXDxPiEY5gZsWGZv7k4Ir6GLQ_XSjTq-Lc2lPnDeQFIvo111fwWinB3O6vxOcAXH3g-CQP5v6eEIaFioyqqrLiQ3hCRfCafCmT_hFMIfcTU7NGjn-Oc9r0t1uKG0nyJ'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private dataFBService: DataFBService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private angularFireMessaging: AngularFireMessaging
  ) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  requestPermission() {
    this.auth.user$.pipe(take(1)).subscribe(val => {
      this.angularFireMessaging.requestToken.subscribe(
        (token) => {
          this.auth.updateToken(val, token);
        },
        (err) => {
          console.error('Unable to get permission to notify.', err);
        }
      );
    });
  }

  async sendMessageToUsher(payload: Object) {
    let tokens = []
    await this.dataFBService.getUsherTokens().toPromise().then(val => {
      console.log(val[0])
      if (val[0]['fcmTokens']) {
        tokens = val[0]['fcmTokens']
      } else {
        console.log('אין אישורים לשלוח הודעות')
      }
    }).catch(err => console.log('Errer:' + err))
    await tokens.forEach(token => {
      const body = {
        "notification": payload,
        "to": token
      };
      this.http.post('https://fcm.googleapis.com/fcm/send', body, httpOptions)
        .toPromise().then(val => console.log(val)).catch(err => console.log('Error:' + err));
    });


  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log(payload)
        this.currentMessage.next(payload);
        const messageText = this.currentMessage.getValue();
        const text = `${messageText['notification']['title']} ${messageText['notification']['body']}`
        console.log(text)
        this.snackBar.open(text, '', {
          verticalPosition: 'top',
          duration: 3000
        });
      })
  }

}




