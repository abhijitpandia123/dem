import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryComponent } from './summary.component';

export const summaryRoute: Routes = [
  {
    path: '',
    component: SummaryComponent
  }
];
