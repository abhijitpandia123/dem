import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DataTablesModule } from 'angular-datatables';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule , MatMenuModule , MatInputModule , MatTableModule ,MatButtonModule,MatCardModule,MatTableDataSource,MatPaginatorModule,MatSortModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

//  import { Dashboard2Component } from "./dashboard2/dashboard2.component";


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        DataTablesModule,
        FormsModule, ReactiveFormsModule,
        MatchHeightModule,
        MatToolbarModule , MatMenuModule ,MatIconModule, MatInputModule , MatTableModule ,MatButtonModule,MatCardModule,MatPaginatorModule,MatSortModule,

    ],
    exports: [MatToolbarModule ,MatIconModule, MatMenuModule ,MatFormFieldModule,  MatInputModule , MatTableModule ,MatButtonModule,MatCardModule,MatPaginatorModule,MatSortModule
    ],
    declarations: [
        DashboardComponent,
        // Dashboard2Component
    ],
    providers: [],
})
export class DashboardModule { }
