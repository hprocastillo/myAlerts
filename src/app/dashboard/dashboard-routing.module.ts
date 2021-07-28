import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from "../auth/guards/auth.guard";
import {SuppliersComponent} from "./suppliers/suppliers.component";
import {ContractsComponent} from "./contracts/contracts.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ReasonsComponent} from "./reasons/reasons.component";
import {CustomersComponent} from "./customers/customers.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'suppliers', component: SuppliersComponent, canActivate: [AuthGuard]},
  {path: 'contracts', component: ContractsComponent, canActivate: [AuthGuard]},
  {path: 'reasons', component: ReasonsComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
