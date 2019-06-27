import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  isCanPlay = true;
  readFromLocalStorage = 'true';
  constructor() {
    this.readFromLocalStorage = localStorage.getItem('isCanPlay');
    if (this.readFromLocalStorage === null) {
      localStorage.setItem('isCanPlay', 'true');
    } else if (this.readFromLocalStorage === 'true') {
      this.isCanPlay = true;
    } else {
      this.isCanPlay = false;
    }
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
