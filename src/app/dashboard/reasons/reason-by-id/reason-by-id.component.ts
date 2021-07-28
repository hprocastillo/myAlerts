import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Reason} from "../../../interfaces/reason";
import {ReasonService} from "../../../services/reason.service";

@Component({
  selector: 'app-reason-by-id',
  templateUrl: './reason-by-id.component.html',
  styleUrls: ['./reason-by-id.component.scss']
})
export class ReasonByIdComponent implements OnInit, OnDestroy {
  @Input() reasonId: string | any;
  reason = {} as Reason;
  private unsubscribe$ = new Subject<void>();

  constructor(private reasonSvc: ReasonService) {
  }

  ngOnInit(): void {
    if (this.reasonId) {
      this.reasonSvc.getReasonById(this.reasonId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.reason = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
