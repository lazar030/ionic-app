import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './service/theme.service';
import { BrainService } from './service/brain.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppBrain, selectAuthState } from './brain/app.brain';
import { Constants } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  getAuthState: Observable<any>;
  isAuthenticated: boolean = false;

  toolbarPanel: any;
  playbarPanel: any;
  menuPanel: any;
  userPanel: any;

  selectedTheme: string;

  isMenuShowed: boolean; 
  isMenuExpaned: boolean;

  isUserShowed: boolean;
  isUserExpanded: boolean;

  isPlayBarShowed: boolean;

  isClickMenuExpand: boolean;
  isClickUserExpand: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private themeService: ThemeService,
    private brainService: BrainService,
    private ngZone: NgZone,
    private store: Store<AppBrain>
  ) {
    this.initializeApp();
    this.initializePanel();
    this.initializePanelStatus();
    this.watchAuthState();
    this.watchMenuPanelStatus();
    this.watchMenuPanelExpanded();
    this.watchUserPanelStatus();
    this.watchUserPanelExpanded();
    this.watchPlayBarStatus();
    this.watchClickMenuExpand();
    this.watchClickUserExpand();
    this.windowResize();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.themeService.getActiveTheme().subscribe(val => this.selectedTheme = val);
      this.setCurrentResolution(window.innerWidth);
      this.setCurrentViewport(window.innerWidth, window.innerHeight);
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }

    });
  }

  initializePanel() {
    this.platform.ready().then(() => {
      this.toolbarPanel = document.getElementById('toolbar');
      this.playbarPanel = document.getElementById('playbar');
      this.menuPanel = document.getElementById('menuPanel');
      this.userPanel = document.getElementById('userPanel');
    })
  }

  initializePanelStatus() {
    if(window.innerWidth >= 992) {
      
    } else if(window.innerWidth < 992 && window.innerWidth >= 577) {
      
    } else if(window.innerWidth < 577) {
      this.brainService.setActiveMenuPanel(false);  
    }
  }

  watchAuthState() {
    this.getAuthState = this.store.select(selectAuthState);
    this.getAuthState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    })
  }

  watchMenuPanelStatus() { // Always catch menu panel is showed or hided ?
    this.brainService.getActiveMenuPanel().subscribe(val => {
      this.isMenuShowed = val;
    })
  }

  watchMenuPanelExpanded() { // Always catch menu panel is expanded or collapsed ?
    this.brainService.getExpandMenuPanel().subscribe(val => {
      this.isMenuExpaned = val;
    })
  }

  watchUserPanelStatus() { // Always catch user panel is showed or hided ?
    this.brainService.getActiveUserPanel().subscribe(val => {
      this.isUserShowed = val;
    })
  }

  watchUserPanelExpanded() { // Always catch user panel is expanded or collapsed ?
    this.brainService.getExpandUserPanel().subscribe(val => {
      this.isUserExpanded = val;
    })
  }

  watchPlayBarStatus() { // Always catch play bar is showed or hided ?
    this.brainService.getActivePlayPanel().subscribe(val => {
      this.isPlayBarShowed = val;
    })
  }

  watchClickMenuExpand() { // Always catch click expand button on menu panel ?
    this.brainService.getActiveClickExpandMenuPanel().subscribe(val => {
      this.isClickMenuExpand = val;
    })
  }

  watchClickUserExpand() { // Always catch click expand button on user panel ?
    this.brainService.getActiveClickExpandUserPanel().subscribe(val => {
      this.isClickUserExpand = val;
    })
  }
  
  windowResize() {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        if(window.innerWidth >= 992 ) { // lg and xl
          // this.brainService.setActiveMenuPanel(true);
          if(this.isAuthenticated) { this.brainService.setActiveUserPanel(true); }
          if(this.isMenuShowed) { // MenuPanel
            if(this.isClickMenuExpand) {
              this.brainService.expandMenuPanel();
              this.brainService.expandToolBarPanelOnDesktop();
              this.brainService.setExpandMenuPanel(true);
            } else {
              this.brainService.collapseMenuPanel();
              this.brainService.collapseToolBarPanelOnDesktop();
              this.brainService.setExpandMenuPanel(false);
            }
          }

          if(this.isUserShowed) { // UserPanel
            if(this.isClickUserExpand) {
              this.brainService.expandUserPanel();
              this.brainService.setExpandUserPanel(true);
            } else {
              this.brainService.collapseUserPanel();
              this.brainService.setExpandUserPanel(false);
            }
          }

          if(this.isPlayBarShowed) { // Set the userpanel mylink height when playbar is show or hide for desktop
            this.brainService.collapseUserPanelLink();
          } else {
            this.brainService.expandUserPanelLink();
          }
        } else if(window.innerWidth < 992 && window.innerWidth >= 577 ) { // md and sm
          // this.brainService.setActiveMenuPanel(true);
          if(this.isAuthenticated) { this.brainService.setActiveUserPanel(true); }
          if(this.isMenuShowed) { // MenuPanel
            this.brainService.collapseMenuPanel();
            this.brainService.collapseToolBarPanelOnDesktop();
            this.brainService.setExpandMenuPanel(false);
          }
          if(this.isUserShowed) { // UserPanel
            this.brainService.collapseUserPanel();
            this.brainService.setExpandUserPanel(false);
          }
          if(this.isPlayBarShowed) { // Set the userpanel mylink height when playbar is show or hide for desktop
            this.brainService.collapseUserPanelLink();
          } else {
            this.brainService.expandUserPanelLink();
          }
        } else if(window.innerWidth < 577) {
          if(this.isMenuShowed) {
            this.brainService.hideMenuBar();
            this.brainService.setActiveMenuPanel(false);

            this.brainService.hideUserPanel();
            this.brainService.setActiveUserPanel(false);

            this.brainService.changeToolBarFullWidth();
          } else {
             
          }
          if(this.isPlayBarShowed) { // Set the userpanel mylink height when playbar is show or hide for mobile
            this.brainService.collapseUserPanelLink_OnMobile();
          } else {
            this.brainService.expandUserPanelLink_OnMobile();
          }
        }
        this.setCurrentResolution(window.innerWidth);
        this.setCurrentViewport(window.innerWidth, window.innerHeight);
      });
    }
  }

  setCurrentResolution(screenWidth: number) {
    if(screenWidth > 0 && screenWidth < 576) {
      this.brainService.setActiveScreenResolution(Constants.screenResolution['xs']);
    } else if(screenWidth > 576 && screenWidth <= 767) {
      this.brainService.setActiveScreenResolution(Constants.screenResolution['sm']);
    } else if(screenWidth > 767 && screenWidth <= 992) {
      this.brainService.setActiveScreenResolution(Constants.screenResolution['md']);
    } else if(screenWidth > 992 && screenWidth <= 1200) {
      this.brainService.setActiveScreenResolution(Constants.screenResolution['lg']);
    } else if(screenWidth > 1200) {
      this.brainService.setActiveScreenResolution(Constants.screenResolution['xl']);
    }
  }

  setCurrentViewport(width: number, height:number) {
    this.brainService.setActiveCurrentViewport(width.toString() + ' * ' + height.toString());
  }

}
