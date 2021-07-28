import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ItemsComponent} from './items/items.component';
import {AlertsComponent} from './alerts/alerts.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NewItemComponent} from './items/new-item/new-item.component';
import {ItemComponent} from './items/item/item.component';
import {NewAlertComponent} from './alerts/new-alert/new-alert.component';
import {AlertComponent} from './alerts/alert/alert.component';
import {ReactiveFormsModule} from "@angular/forms";
import {EnterprisesComponent} from './enterprises/enterprises.component';
import {AlertDeleteSupplier, SuppliersComponent} from './suppliers/suppliers.component';
import {ContractsComponent} from './contracts/contracts.component';
import {AlertDeleteReason, ReasonsComponent} from './reasons/reasons.component';
import {NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {NewContractComponent} from './contracts/new-contract/new-contract.component';
import {ListContractsComponent} from './contracts/list-contracts/list-contracts.component';
import {AlertDeleteCustomer, CustomersComponent} from './customers/customers.component';
import { CustomerByIdComponent } from './customers/customer-by-id/customer-by-id.component';
import { SupplierByIdComponent } from './suppliers/supplier-by-id/supplier-by-id.component';
import { TypeContractsComponent } from './type-contracts/type-contracts.component';
import { TypeContractByIdComponent } from './type-contracts/type-contract-by-id/type-contract-by-id.component';
import { ReasonByIdComponent } from './reasons/reason-by-id/reason-by-id.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ItemsComponent,
    AlertsComponent,
    CalendarComponent,
    NewItemComponent,
    ItemComponent,
    NewAlertComponent,
    AlertComponent,
    EnterprisesComponent,
    SuppliersComponent,
    ContractsComponent,
    ReasonsComponent,
    AlertDeleteReason,
    AlertDeleteSupplier,
    NewContractComponent,
    ListContractsComponent,
    CustomersComponent,
    AlertDeleteCustomer,
    CustomerByIdComponent,
    SupplierByIdComponent,
    TypeContractsComponent,
    TypeContractByIdComponent,
    ReasonByIdComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgbTypeaheadModule
  ]
})
export class DashboardModule {
}
