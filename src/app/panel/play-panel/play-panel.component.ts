import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { PlaylistService } from 'src/app/service/playlist.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/constants/constants';
import { BrainService } from 'src/app/service/brain.service';

declare var WaveSurfer;

@Component({
  selector: 'app-play-panel',
  templateUrl: './play-panel.component.html',
  styleUrls: ['./play-panel.component.scss'],
})
export class PlayPanelComponent implements OnInit, AfterViewInit {

  isPlay: boolean = false;
  isPause: boolean = false;
  isStop: boolean = true;

  isShowPlayerBar = false;
  isEqualizerCreated = false;

  curVolume: number = 100;

  curDurationTime: any = '00:00';
  songDuration: any = '--:--';

  currentProgress: number = 0;

  wavesurfer: any;
  loaded: boolean = false;

  playListInfos: any = [];
  playList: any = [];
  isFirstPlay: boolean = false;
  cntList = 0;
  startIdx = 0;

  isDuskTheme: boolean = true;
  nameTheme: string;

  songSelectState = 'neutral';
  likeClicked: boolean = false;
  dislikeClicked: boolean = false;

  currentScreenResolution: string;
  currentScreenViewPort: string;

  constructor(
    private themeService: ThemeService,
    private playlistService: PlaylistService,
    private brainService: BrainService,
    private notificationService: NotificationService,
    private modalController: ModalController
  ) {
    this.themeService.getActiveTheme().subscribe(val => {
      if (val === Constants.duskTheme) { this.nameTheme = Constants.tooltipDawnTheme; }
      else { this.nameTheme = Constants.tooltipDuskTheme; }
    })

    this.brainService.getActiveScreenResolution().subscribe(val => {
      this.currentScreenResolution = val;
    })

    this.brainService.getActiveCurrentViewport().subscribe(val => {
      this.currentScreenViewPort = val;
    })
  }

  ngOnInit() {
    this.getPlayList();
    // this.createWaveSurfer();
    // this.changeWaveSurferSomeColors();
  }

  ngAfterViewInit() {
    this.watchPlayPanelStatus();
  }

  watchPlayPanelStatus() {
    this.brainService.getActivePlayPanel().subscribe(val => {
      if (val) { this.brainService.showPlayPanel(); }
      else { this.brainService.hidePlayPanel(); }
    });
  }

  changeWaveSurferSomeColors() {
    this.themeService.getActiveTheme().subscribe(val => {
      if (val === Constants.duskTheme) {
        this.wavesurfer.setWaveColor('#aaaaaa');
        this.wavesurfer.setCursorColor('#ffffff');
        this.wavesurfer.setProgressColor('#f74264');
      }
      else {
        this.wavesurfer.setWaveColor('#555555');
        this.wavesurfer.setCursorColor('#000000');
        this.wavesurfer.setProgressColor('#f74264');
      }
    });
  }

  getPlayList() {
    this.playlistService.getPlayList().subscribe(res => {
      this.playListInfos = res;
      this.cntList = this.playListInfos.length === undefined ? 0 : this.playListInfos.length;

      if(this.cntList === 0) { this.brainService.hidePlayPanel(); this.brainService.setActivePlayPanel(false); }
      else { this.brainService.showPlayPanel(); this.brainService.setActivePlayPanel(true); }

      // this.playList = [];
      // for (let i = 0; i < this.playListInfos.length; i++) {
      //   this.playList.push(this.playListInfos[i]);
      // }

      // if(this.cntList === 0) { 
        
      // } else {
      //   if(!this.isFirstPlay) {
      //     this.makeWaveSurfer(this.startIdx);
      //     this.playlistService.setCurrentPlayingSongInfo(this.playListInfos[this.startIdx]);
      //     this.isFirstPlay = true;
      //   }
      // }
    });
  }

  createWaveSurfer() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      mediaType:'audio',
      normalize: true,
      cursorColor: '#ffffff',
      waveColor: '#aaaaaa',
      progressColor: '#f74264',
      height: 45,
      hideScrollbar: true,
      responsive: true,
      barWidth: 2,
      barHeight: 1,
      barGap: null
    });

    let self = this;
    let selfWave = this.wavesurfer;

    this.wavesurfer.on("ready", function () {
      let filter = selfWave.backend.ac.createBiquadFilter();
      // if(!self.isEqualizerCreated) {
      //   const EQ = [
      //     { f: 32, type: 'lowshelf'},
      //     { f: 64, type: 'peaking'},
      //     { f: 125, type: 'peaking'},
      //     { f: 250, type: 'peaking'},
      //     { f: 500, type: 'peaking'},
      //     { f: 1000, type: 'peaking'},
      //     { f: 2000, type: 'peaking'},
      //     { f: 4000, type: 'peaking'},
      //     { f: 8000, type: 'peaking'},
      //     { f: 16000, type: 'lowshelf'}
      //   ]      

      //   let filters = EQ.map(function (band) {
      //     let filter = selfWave.backend.ac.createBiquadFilter();
      //     filter.type = band.type;
      //     filter.gain.value = 0;
      //     filter.Q.value = 1;
      //     filter.frequency.value = band.f;
      //     return filter;
      //   });

      //   selfWave.backend.setFilters(filters);
      //   let container = document.getElementById('equalizerDesktop');
      //   filters.forEach(function(filter) {
      //     let input = document.createElement('input');
      //     selfWave.util.extend(input, {
      //       type: 'range',
      //       min: -40,
      //       max: 40,
      //       value: 0,
      //       title: filter.frequency.value
      //     });
      //     input.style.display = "inline-block";
      //     input.setAttribute('orient', 'vertical');
      //     selfWave.util.style(input, {
      //       'webkitAppearance': 'slider-vertical',
      //       width: '25px',
      //       height: '60px'
      //     })
      //     container.appendChild(input);
  
      //     let onChange = function(e) {
      //       filter.gain.value = ~~e.target.value;
      //     };
  
      //     input.addEventListener('input', onChange);
      //     input.addEventListener('change', onChange);
      //     self.isEqualizerCreated = true;
      //   });
      // }
    });
  }

  makeWaveSurfer(idx) {
    this.wavesurfer.load(this.playList[idx].src);
    this.wavesurfer.loaded = false;

    let self = this;
    let selfWave = this.wavesurfer

    this.wavesurfer.on("ready", function () {
      if(!selfWave.loaded) {
        selfWave.loaded = true;
        // selfWave.play();
        self.songDuration = Math.floor(selfWave.getDuration() / 60) + ':' + (Math.floor(selfWave.getDuration() % 60) < 10 ? '0' : '') + Math.floor(selfWave.getDuration() % 60);
      }
    });

    this.wavesurfer.on("audioprocess", function(e) {
      if(selfWave.isPlaying()) {
        let currentSeconds = (Math.floor(selfWave.getCurrentTime() % 60) < 10 ? '0' : '') + Math.floor(selfWave.getCurrentTime() % 60);
        let currentMinutes = Math.floor(selfWave.getCurrentTime() / 60);
        // let currentTimePlaceholder = document.getElementById('curDurationTime');
        // currentTimePlaceholder.textContent = (currentMinutes > 10 ? currentMinutes : '0' + currentMinutes) + ':' + currentSeconds;

        let totalTime = selfWave.getDuration(),
            currentTime = selfWave.getCurrentTime(),
            remainingTime = totalTime - currentTime;
        let remainSeconds = (Math.floor(remainingTime % 60) < 10 ? '0' : '') + Math.floor(remainingTime % 60);
        let remainMinutes = Math.floor(remainingTime / 60);
        let remainPlaceholder = document.getElementById('remainTime');
        remainPlaceholder.textContent = (remainMinutes > 10 ? remainMinutes : '0' + remainMinutes) + ':' + remainSeconds;

        let percentageOfSong = currentTime / totalTime;
        let percentageOfSlider = document.getElementById('progressWrapper').offsetWidth * percentageOfSong;
        document.getElementById('trackProgress').style.width = Math.round(percentageOfSlider) + 'px';
      }
    });

    this.wavesurfer.on('finish', function(e) {
      self.next();
    });
  }

  play() {
    // if(this.cntList === 0) {
    //   this.notificationService.showWarning(Constants.msgEmptiedPlayList);
    // } else {
    //   this.isPlay = true;
    //   this.isPause = false;
    //   this.isStop = false;
    //   this.wavesurfer.play();
    //   this.notificationService.showSuccess(Constants.msgSongPlayed);
    // }
  }

  pause() {
    // this.isPlay = false;
    // this.isPause = true;
    // this.isStop = false;
    // this.wavesurfer.pause();
    // this.notificationService.showSuccess(Constants.msgSongPaused);
  }

  next() {
    // if(this.cntList > 0) {
    //   if ((this.startIdx + 1) < this.cntList) {
    //     this.wavesurfer.stop();
    //     this.startIdx++;
    //     this.makeWaveSurfer(this.startIdx);
    //     this.playlistService.setCurrentPlayingSongInfo(this.playListInfos[this.startIdx]);
    //     let selfWave = this.wavesurfer;
    //     this.wavesurfer.on("ready", function () {
    //       selfWave.play();
    //     }); 
    //   } else {
    //     this.startIdx = this.cntList - 1;
    //     this.notificationService.showWarning(Constants.msgNoSongPlayList);
    //   }
    // } else {
    //   this.notificationService.showWarning(Constants.msgEmptiedPlayList);
    // }
  }

  playPause() {

  }

  volumeChange() {
    this.wavesurfer.setVolume(this.curVolume / 100);
  }

  showBar() {
    this.isShowPlayerBar = !this.isShowPlayerBar;
  }

  toggleAppTheme() {
    if (this.isDuskTheme) {
      this.themeService.setActiveTheme(Constants.dawnTheme);
    } else {
      this.themeService.setActiveTheme(Constants.duskTheme);
    }
    this.isDuskTheme = !this.isDuskTheme;
  }

  selectSongState() {
    if(this.songSelectState === 'like') {
      if(this.likeClicked) { this.songSelectState = 'neutral'; this.likeClicked = false; this.dislikeClicked = false; }
      else { this.likeClicked = true; this.dislikeClicked = false; }
    } else if(this.songSelectState === 'dislike') {
      if(this.dislikeClicked) { this.songSelectState = 'neutral'; this.dislikeClicked = false; this.likeClicked = false; }
      else { this.likeClicked = false; this.dislikeClicked = true; }
    } else {
      this.likeClicked = false; this.dislikeClicked = false;
    }
  }

}
