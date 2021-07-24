import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ItemsComponent } from './items/items.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewItemComponent } from './items/new-item/new-item.component';
import { ItemComponent } from './items/item/item.component';
import { NewAlertComponent } from './alerts/new-alert/new-alert.component';
import { AlertComponent } from './alerts/alert/alert.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ItemsComponent,
    AlertsComponent,
    CalendarComponent,
    NewItemComponent,
    ItemComponent,
    NewAlertComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
