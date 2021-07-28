import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Customer} from "../../interfaces/customer";
import {CustomerService} from "../../services/customer.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit, OnDestroy {
  showForm = false;
  showList = true;
  filter: string = 'ALL';
  listCustomers: Customer[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private customerSvc: CustomerService) {
  }

  ngOnInit(): void {
    this.customerSvc.getCustomers()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Customer[]) => {
        this.listCustomers = res;
      });
  }

  selectCustomer(event: any) {
    this.filter = event.value;
  }

  showFormNewContract() {
    this.showForm = true;
    this.showList = false;
  }

  showListContract() {
    this.showForm = false;
    this.showList = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
