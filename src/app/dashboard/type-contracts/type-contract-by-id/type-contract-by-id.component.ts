import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {TypeContract} from "../../../interfaces/type-contract";
import {TypeContractService} from "../../../services/type-contract.service";

@Component({
  selector: 'app-type-contract-by-id',
  templateUrl: './type-contract-by-id.component.html',
  styleUrls: ['./type-contract-by-id.component.scss']
})
export class TypeContractByIdComponent implements OnInit,OnDestroy {

  @Input() typeContractId: string | any;
  typeContract = {} as TypeContract;
  private unsubscribe$ = new Subject<void>();

  constructor(private typeContractSvc: TypeContractService) {
  }

  ngOnInit(): void {
    if (this.typeContractId) {
      this.typeContractSvc.getTypeContractById(this.typeContractId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.typeContract = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
