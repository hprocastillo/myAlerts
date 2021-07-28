import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../interfaces/customer";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-customer-by-id',
  templateUrl: './customer-by-id.component.html',
  styleUrls: ['./customer-by-id.component.scss']
})
export class CustomerByIdComponent implements OnInit, OnDestroy {
  @Input() customerId: string | any;
  customer = {} as Customer;
  private unsubscribe$ = new Subject<void>();

  constructor(private customerSvc: CustomerService) {
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.customerSvc.getCustomerById(this.customerId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.customer = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
