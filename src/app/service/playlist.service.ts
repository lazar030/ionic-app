import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private playList: BehaviorSubject<object>;
  private curPlayingSongInfo: BehaviorSubject<object>;

  constructor() {
    this.playList = new BehaviorSubject({});
    this.curPlayingSongInfo = new BehaviorSubject({});
  }

  setPlayList(val) {
    this.playList.next(val);
  }

  getPlayList() {
    return this.playList.asObservable();
  }

  setCurrentPlayingSongInfo(val) {
    this.curPlayingSongInfo.next(val);
  }

  getCurrentPlayingSongInfo() {
    return this.curPlayingSongInfo.asObservable();
  }
}
