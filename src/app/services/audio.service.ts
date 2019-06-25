import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  isCanPlay = true;
  readFromLocalStorage = 'true';
  constructor() {
    this.readFromLocalStorage = localStorage.getItem('isCanPlay');
    this.readFromLocalStorage === 'true'
      ? (this.isCanPlay = true)
      : (this.isCanPlay = false);
  }

  playAudio(sound: string) {
    let audio = new Audio();
    switch (sound) {
      case 'endTrip':
        if (this.isCanPlay) {
          audio.src = '../../../assets/audio/endTrip.mp3';
          audio.load();
          audio.play();
        }
        break;
      case 'longTrip':
        if (this.isCanPlay) {
          audio.src = '../../../assets/audio/longTrip.mp3';
          audio.load();
          audio.play();
        }
        break;
      default:
        break;
    }
  }
}
