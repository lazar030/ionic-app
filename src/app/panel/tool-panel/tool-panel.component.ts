import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { BrainService } from 'src/app/service/brain.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppBrain, selectAuthState } from '../../brain/app.brain';
import { LoadingService } from 'src/app/service/loading.service';
import { LogIn } from 'src/app/brain/actions/auth.actions';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss'],
})
export class ToolPanelComponent implements OnInit, AfterViewInit {

  selectedTheme: string;

  getAuthState: Observable<any>;
  isAuthenticated: boolean = false;

  isMenuPanelShowed: boolean;
  isMenuPanelExpanded: boolean;
  isUserPanelShowed: boolean;
  isUserPanelExpanded: boolean;

  constructor(
    private themeService: ThemeService,
    private brainService: BrainService,
    private loadingService: LoadingService,
    private store: Store<AppBrain>
  ) {
    this.themeService.getActiveTheme().subscribe(res => { this.selectedTheme = res; })
  }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.watchAuthState();
    this.watchMenuPanelStatus();
    this.watchMenuPanelExpanded();
    this.watchUserPanelStatus();
    this.watchUserPanelExpanded();
  }

  openUserPanel() {
    if(this.isUserPanelExpanded) {
      this.brainService.showUserPanel();
    } else {
      this.brainService.collapseUserPanel();
    }
    setTimeout(() => {
      this.brainService.setActiveUserPanel(true);
    }, 0);
  }

  showMenuBar() {
    if(this.isMenuPanelExpanded) {
      this.brainService.showMenuBar();
      this.brainService.expandToolBarPanelOnDesktop();
    } else {
      this.brainService.collapseMenuPanel();
      this.brainService.collapseToolBarPanelOnDesktop();
    }
    this.brainService.setActiveMenuPanel(true);
  }

  focusSearchInput(element) {
    element.classList.add('expand');
  }

  focusoutSearchInput(element) {
    element.classList.remove('expand');
  }

  watchAuthState() { // Always catch user is authenticated or not ?
    this.getAuthState = this.store.select(selectAuthState);
    this.getAuthState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.loadingService.dismiss();
    })
  }

  watchMenuPanelStatus() { // Always catch menu panel is showed or hided ?
    this.brainService.getActiveMenuPanel().subscribe(val => {
      this.isMenuPanelShowed = val;
    });
  }

  watchMenuPanelExpanded() {
    this.brainService.getExpandMenuPanel().subscribe(val => {
      this.isMenuPanelExpanded = val;
    })
  }

  watchUserPanelStatus() {
    this.brainService.getActiveUserPanel().subscribe(val => {
      this.isUserPanelShowed = val;
    })
  }

  watchUserPanelExpanded() {
    this.brainService.getExpandUserPanel().subscribe(val => {
      this.isUserPanelExpanded = val;
    })
  }


/*
 * For Mobile Version 
 */

  showMenuBar_Mobile() {
    if(this.isMenuPanelExpanded) {
      this.brainService.showMenuBar();
    } else {
      this.brainService.collapseMenuPanel();
    }
    setTimeout(() => {
      this.brainService.setActiveMenuPanel(true);
    }, 0);
  }

/**
 * Login
 */

  onSubmit() {
    const payload = {
      email: 'fake@login.com',
      password: '123'
    }
    this.loadingService.present();
    this.store.dispatch(new LogIn(payload));
  }

}
