import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Supplier} from "../../../interfaces/supplier";
import {SupplierService} from "../../../services/supplier.service";

@Component({
  selector: 'app-supplier-by-id',
  templateUrl: './supplier-by-id.component.html',
  styleUrls: ['./supplier-by-id.component.scss']
})
export class SupplierByIdComponent implements OnInit, OnDestroy {
  @Input() show: string | any;
  @Input() supplierId: string | any;
  supplier = {} as Supplier;
  private unsubscribe$ = new Subject<void>();

  constructor(private supplierSvc: SupplierService) {
  }

  ngOnInit(): void {
    if (this.supplierId) {
      this.supplierSvc.getSupplierById(this.supplierId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.supplier = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
