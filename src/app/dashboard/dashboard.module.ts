import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DataTablesModule } from 'angular-datatables';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DasboardhomeComponent } from './dasboardhome/dasboardhome.component';
//  import { Dashboard2Component } from "./dashboard2/dashboard2.component";


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        DataTablesModule,
        FormsModule, ReactiveFormsModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
        DasboardhomeComponent,
        // Dashboard2Component
    ],
    providers: [],
})
export class DashboardModule { }
