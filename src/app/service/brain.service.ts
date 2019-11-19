import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Constants } from '../constants/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrainService {

  toolbarPanel: any;
  playbarPanel: any;
  menuPanel: any;
  userPanel: any;
  content: any;

  menuPanel_mylink: any;
  userPanel_mylink: any;

  isMenuPanelShowed: BehaviorSubject<boolean>;
  isMenuPanelExpanded: BehaviorSubject<boolean>;

  isUserPanelShowed: BehaviorSubject<boolean>;
  isUserPanelExpanded: BehaviorSubject<boolean>;

  isPlayPanelShowed: BehaviorSubject<boolean>;
  isPlayPanelExpanded: BehaviorSubject<boolean>;

  isClickMenuExpand: BehaviorSubject<boolean>;
  isClickUserExpand: BehaviorSubject<boolean>;

  currentScreenSize: BehaviorSubject<string>;
  currentScreenViewport: BehaviorSubject<string>;

  constructor(
    private platform: Platform
  ) {
    this.isMenuPanelShowed = new BehaviorSubject(true);
    this.isMenuPanelExpanded = new BehaviorSubject(true);

    this.isUserPanelShowed = new BehaviorSubject(false);
    this.isUserPanelExpanded = new BehaviorSubject(true);

    this.isPlayPanelShowed = new BehaviorSubject(true);
    this.isPlayPanelExpanded = new BehaviorSubject(false);

    this.isClickMenuExpand = new BehaviorSubject(true);
    this.isClickUserExpand = new BehaviorSubject(true);

    this.currentScreenSize = new BehaviorSubject(Constants.screenResolution['lg']);
    this.currentScreenViewport = new BehaviorSubject('0 * 0');
  }

  getElements() {
    this.toolbarPanel = document.getElementById('toolbar');
    this.playbarPanel = document.getElementById('playbar');
    this.menuPanel = document.getElementById('menuPanel');
    this.userPanel = document.getElementById('userPanel');
    this.content = document.getElementById('content');

    this.menuPanel_mylink = document.getElementById('menuPanel_mylink');
    this.userPanel_mylink = document.getElementById('userPanel_mylink');
  }

  isMobile() {
    if (window.innerWidth < 577) { return true; }
    else { return false; }
  }

/**
 * For Tool Bar
 */

  expandToolBarPanelOnDesktop() { // When menu panel is icon-view mode.
    this.getElements();
    this.toolbarPanel.style.width = "calc(100% - " + Constants.expandSideBarWidth + Constants.unitScreen + ")";
  }

  collapseToolBarPanelOnDesktop() { // When menu panel is full-view mode.
    this.getElements();
    this.toolbarPanel.style.width = "calc(100% - " + Constants.collapseSideBarWidth + Constants.unitScreen + ")";
  }

  changeToolBarFullWidth() { // When user isn't logged: isAuthenticated = false
    this.getElements();
    this.toolbarPanel.style.width = '100%';
  }

/**
 * For Menu Bar
 */

  setActiveMenuPanel(val) {
    this.isMenuPanelShowed.next(val);
  }

  getActiveMenuPanel() {
    return this.isMenuPanelShowed.asObservable();
  }

  setExpandMenuPanel(val) {
    this.isMenuPanelExpanded.next(val);
  }

  getExpandMenuPanel() {
    return this.isMenuPanelExpanded.asObservable();
  }

  expandMenuPanel() {
    this.getElements();
    this.menuPanel.style.borderWidth = '1px';
    this.menuPanel.style.width = Constants.expandSideBarWidth + Constants.unitScreen;
    if(!this.isMobile()) {
      this.setContentPadding('expand');
    }
  }

  collapseMenuPanel() {
    this.getElements();
    this.menuPanel.style.borderWidth = '1px';
    this.menuPanel.style.width = Constants.collapseSideBarWidth + Constants.unitScreen; 
    this.setContentPadding('collapse');
  }

  expandMenuPanelLink() {
    this.getElements();
    this.menuPanel_mylink.style.height = "calc(100% - " + 130 + Constants.unitScreen + ")";
  }

  collapseMenuPanelLink() {
    this.getElements();
    this.menuPanel_mylink.style.height = "calc(100% - " + 210 + Constants.unitScreen + ")";
  }
  
  hideMenuBar() {
    this.getElements();
    this.menuPanel.style.borderWidth = 0;
    this.menuPanel.style.width = 0;
    this.setContentPadding('none');
  }

  showMenuBar() {
    this.getElements();
    this.menuPanel.style.borderWidth = '1px';
    this.menuPanel.style.width = Constants.expandSideBarWidth + Constants.unitScreen;
  }

/**
 * For User Panel
 */

  setActiveUserPanel(val) {
    this.isUserPanelShowed.next(val);
  }

  getActiveUserPanel() {
    return this.isUserPanelShowed.asObservable();
  }

  setExpandUserPanel(val) {
    this.isUserPanelExpanded.next(val);
  }

  getExpandUserPanel() {
    return this.isUserPanelExpanded.asObservable();
  }

  expandUserPanel() {
    this.getElements();
    this.userPanel.style.borderWidth = '1px';
    this.userPanel.style.width = Constants.expandSideBarWidth + Constants.unitScreen;
  }

  collapseUserPanel(){
    this.getElements();
    this.userPanel.style.borderWidth = '1px';
    this.userPanel.style.width = Constants.collapseSideBarWidth + Constants.unitScreen; 
  }

  expandUserPanelLink() {
    this.getElements();
    this.userPanel_mylink.style.height = "calc(100vh - " + 210 + Constants.unitScreen + ")";
  }

  collapseUserPanelLink() {
    this.getElements();
    this.userPanel_mylink.style.height = "calc(100vh - " + 290 + Constants.unitScreen + ")";
  }

  expandUserPanelLink_OnMobile() {
    this.getElements();
    this.userPanel_mylink.style.height = "calc(100vh - " + 130 + Constants.unitScreen + ")";
  }

  collapseUserPanelLink_OnMobile() {
    this.getElements();
    this.userPanel_mylink.style.height = "calc(100vh - " + 210 + Constants.unitScreen + ")";
  }

  hideUserPanel() {
    this.getElements();
    this.userPanel.style.borderWidth = 0;
    this.userPanel.style.width = 0;
  }

  showUserPanel() {
    this.getElements();
    this.userPanel.style.borderWidth = '1px';
    this.userPanel.style.width = Constants.expandSideBarWidth + Constants.unitScreen;
  }  

/**
 * For Playbar Panel
 */

  setActivePlayPanel(val) {
    this.isPlayPanelShowed.next(val);
  }

  getActivePlayPanel() {
    return this.isPlayPanelShowed.asObservable();
  }

  hidePlayPanel() {
    this.getElements();
    this.playbarPanel.style.borderWidth = 0;
    this.playbarPanel.style.height = 0;
  }

  showPlayPanel() {
    this.getElements();
    this.playbarPanel.style.borderWidth = '1px';
    this.playbarPanel.style.height = Constants.playBarHeight + Constants.unitScreen;
  }


/**
 * For state for click expand button on menubar or userpanel
 */

  setActiveClickExpandMenuPanel(val) {
    this.isClickMenuExpand.next(val);
  }

  getActiveClickExpandMenuPanel() {
    return this.isClickMenuExpand.asObservable();
  }

  setActiveClickExpandUserPanel(val) {
    this.isClickUserExpand.next(val);
  }

  getActiveClickExpandUserPanel() {
    return this.isClickUserExpand.asObservable();
  }

/**
 * Set padding to content (middle section on the screen)
 */

  setContentPadding(type: string) {
    this.getElements();
    switch(type) {
      case 'expand':
        this.content.classList.remove('contentCollapsePadding');
        this.content.classList.remove('contentNonePadding');
        this.content.classList.add('contentExpandPadding');
        break;
      case 'collapse':
        this.content.classList.remove('contentExpandPadding');
        this.content.classList.remove('contentNonePadding');
        this.content.classList.add('contentCollapsePadding')
        break;
      case 'none':
        this.content.classList.remove('contentExpandPadding');
        this.content.classList.remove('contentCollapsePadding');
        this.content.classList.add('contentNonePadding')
        break;
      default:
        break;
    }
  }

/**
 * Set & Get current screen resolution state
 */

  setActiveScreenResolution(val) {
    this.currentScreenSize.next(val);
  }

  getActiveScreenResolution() {
    return this.currentScreenSize.asObservable();
  }

  setActiveCurrentViewport(val) {
    this.currentScreenViewport.next(val);
  }

  getActiveCurrentViewport() {
    return this.currentScreenViewport.asObservable();
  }

}
