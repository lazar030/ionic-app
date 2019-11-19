import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Events } from '@ionic/angular';
import { ThemeService } from 'src/app/service/theme.service';
import { Constants } from 'src/app/constants/constants';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppBrain, selectAuthState } from '../../brain/app.brain';
import { BrainService } from 'src/app/service/brain.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, AfterViewInit {

  userPanel: any;
  curUrlTitle: string;

  getAuthState: Observable<any>;
  isAuthenticated: boolean = false;

  isExpanded: boolean;
  isShowed: boolean;

  constructor(
    private store: Store<AppBrain>,
    private brainService: BrainService,
    private ngZone: NgZone
  ) {
    
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.watchAuthState();
    this.watchUserPanelStatus();
    this.watchUserPanelExpanded();
    this.watchPlayBarStatus();
  }

  closeUserPanel() {
    this.brainService.hideUserPanel();
    this.brainService.setActiveUserPanel(false);
  }

  navigate(url: string) {
    this.curUrlTitle = url;
    this.closeUserPanel();
  }

  watchAuthState() {
    this.getAuthState = this.store.select(selectAuthState);
    this.getAuthState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      if(state.isAuthenticated) {
        this.brainService.showUserPanel();
        this.brainService.setActiveUserPanel(true);
      } else {
        this.brainService.hideUserPanel();
        this.brainService.setActiveUserPanel(false);
      }
    })
  }

  watchUserPanelStatus() {
    this.brainService.getActiveUserPanel().subscribe(val => {
      this.isShowed = val;
    })
  }

  watchUserPanelExpanded() {
    this.brainService.getExpandUserPanel().subscribe(val => {
      this.isExpanded = val;
    })
  }

  watchPlayBarStatus() {
    this.brainService.getActivePlayPanel().subscribe(val => {
      if(val) {
        if(this.brainService.isMobile()) {
          this.brainService.collapseUserPanelLink_OnMobile();
        } else {
          this.brainService.collapseUserPanelLink();
        }
      } else {
        if(this.brainService.isMobile()) {
          this.brainService.expandUserPanelLink_OnMobile();
        } else {
          this.brainService.expandUserPanelLink();
        }
      }
    });
  }

  setUserPanelScaling() {
    if(this.isExpanded) {
      this.brainService.collapseUserPanel();
    } else {
      this.brainService.expandUserPanel();
    }
    this.brainService.setActiveClickExpandUserPanel(!this.isExpanded);
    setTimeout(() => {
      this.brainService.setExpandUserPanel(!this.isExpanded);
    }, 0);
  }

  clickOutside() {
    if(this.brainService.isMobile()) {
      if(this.isShowed) {
        if(this.isExpanded) {
          this.brainService.collapseUserPanel();
          this.brainService.setExpandUserPanel(false);
          // this.brainService.hideUserPanel();
          // this.brainService.setActiveUserPanel(false);
        }
      }
    }
  }

}