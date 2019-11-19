import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { PlayPanelComponent } from './play-panel/play-panel.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

import { BrainService } from '../service/brain.service';

import { NbTooltipModule } from '@nebular/theme';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    declarations: [ MenuPanelComponent, PlayPanelComponent, ToolPanelComponent, UserPanelComponent ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        IonicModule,
        NbTooltipModule,
        ClickOutsideModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        BrainService
    ],
    exports: [ MenuPanelComponent, PlayPanelComponent, ToolPanelComponent, UserPanelComponent ]
})
export class BrainModule {}