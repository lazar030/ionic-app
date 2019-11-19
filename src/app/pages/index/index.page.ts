import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/service/json.service';
import { PlaylistService } from 'src/app/service/playlist.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  listSongs: any;
  checkPlayList: any = {};
  aryPlayList: any = [];

  constructor(
    private jsonService: JsonService,
    private playlistService: PlaylistService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.jsonService.getSongs().subscribe(res => {
      this.listSongs = res;
    });
  }

  addToPlayList(idx) {
    this.checkPlayList[idx] = this.listSongs[idx];
    this.aryPlayList.push(this.listSongs[idx]);
    this.playlistService.setPlayList(this.aryPlayList);
    this.notificationService.showSuccess(Constants.msgAddSongToPlayList);
  }

  removeFromPlayList(id, idx) {
    delete this.checkPlayList[idx];

    for (let i = 0; i < this.aryPlayList.length; i++) {
      if (this.aryPlayList[i].id === id) {
        this.aryPlayList.splice(i, 1);
      }
    }
    this.playlistService.setPlayList(this.aryPlayList);

    this.notificationService.showWarning(Constants.msgRemoveSongToPlayList);
  }
}
