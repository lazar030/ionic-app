import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Constants } from '../../constants/constants';
import { ThemeService } from 'src/app/service/theme.service';
import { BrainService } from 'src/app/service/brain.service';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})
export class MenuPanelComponent implements OnInit, AfterViewInit {

  selectedTheme: string;
  currentUrlTitle: string = 'home';

  isExpanded: boolean;
  isShowed: boolean;

  isClickedHamburger: boolean;

  public appBrowserPages = [
    { title: 'Home', url: '/home', icon: 'fal fa-home' },
    { title: 'Recommendations', url: '/home/recommendations', icon: 'fal fa-book-reader' },
    { title: 'New Release', url: '/home/new-release', icon: 'fal fa-calendar-minus' },
    { title: 'Radio', url: '/home/radio', icon: 'fa fa-signal-stream' },
    { title: 'Feed', url: '/home/feed', icon: 'fa fa-book-open' }    
  ]

  public appYourPages = [
    { title: 'Your Arena', url: '/home/your-arena', icon: 'fal fa-plus' },
    { title: 'History', url: '/home/history', icon: 'fal fa-history' },
  ]

  public appArtistPages = [
    { title: 'Your Stats', url: '/home/your-stats', icon: 'fal fa-signal' },
  ]
  constructor(
    private themeService: ThemeService,
    private brainService: BrainService
  ) {
    
  }

  ngOnInit() {
    this.initializeNavigation();
  }

  ngAfterViewInit() {
    this.watchMenuPanelStatus();
    this.watchMenuPanelExpanded();
    this.watchPlayBarStatus();
  }

  initializeNavigation() {
    this.themeService.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  navigate(title: any) {
    this.currentUrlTitle = title;
  }

  watchMenuPanelStatus() { // Always catch menu panel is showed or hided ?
    this.brainService.getActiveMenuPanel().subscribe(val => {
      this.isShowed = val;
    })
  }

  watchMenuPanelExpanded() { // Always catch menu panel is expaned or collapsed ?
    this.brainService.getExpandMenuPanel().subscribe(val => {
      this.isExpanded = val;
    })
  }

  watchPlayBarStatus() { // Always catch play bar is showed or hided ?
    this.brainService.getActivePlayPanel().subscribe(val => {
      if(val) {
        this.brainService.collapseMenuPanelLink();
      } else {
        this.brainService.expandMenuPanelLink();
      }
    })
  }

  setMenuScaling() { // Set menu panel to expand or collpase
    if(this.isExpanded) {
      this.brainService.collapseMenuPanel();
      if(this.brainService.isMobile()) {

      } else {
        this.brainService.collapseToolBarPanelOnDesktop();
      }
    } else {
      this.brainService.expandMenuPanel();
      if(this.brainService.isMobile()) {

      } else {
        this.brainService.expandToolBarPanelOnDesktop();
      }
    }
    this.brainService.setActiveClickExpandMenuPanel(!this.isExpanded);
    setTimeout(() => {
      this.brainService.setExpandMenuPanel(!this.isExpanded);
    }, 0);
  }

  setMenuHide() { // Set menu panel to show or hide
    this.brainService.hideMenuBar();
    this.brainService.changeToolBarFullWidth();
    this.brainService.setActiveMenuPanel(false);
  }

  clickOutside() {
    if(this.brainService.isMobile()) {
      if(this.isShowed) {
        if(this.isExpanded) {
          this.brainService.collapseMenuPanel();
          this.brainService.setExpandMenuPanel(!this.isExpanded);
          // this.brainService.hideMenuBar();
          // this.brainService.setActiveMenuPanel(false);
        } else {
          
        }
      }
    }
  }
}
