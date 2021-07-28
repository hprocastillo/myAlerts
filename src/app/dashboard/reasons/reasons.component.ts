import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReasonService} from "../../services/reason.service";
import {Reason} from "../../interfaces/reason";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss']
})
export class ReasonsComponent implements OnInit, OnDestroy {
  today = new Date();
  newFormReason: FormGroup;
  listReasons: Reason[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private fb: FormBuilder, private reasonSvc: ReasonService, private _modalService: NgbModal) {
    this.newFormReason = this.fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.reasonSvc.getReason()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Reason[]) => {
        this.listReasons = res;
        console.log(this.listReasons)
      });
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormReason.valid) {

      const reason = this.newFormReason.value;
      const reasonId = reason?.id || null;
      reason.description = reason.description.toUpperCase();
      reason.userId = userId;
      reason.userDisplayName = userDisplayName;
      reason.userEmail = userEmail;
      reason.userPhotoUrl = userPhotoUrl;
      reason.createdAt = this.today;
      reason.updatedAt = this.today;
      this.reasonSvc.saveReason(reason, reasonId).then(r => r).catch(err => console.log(err));
      this.newFormReason.reset();
    }
  }

  onDelete(reasonId: any) {
    const modalRef = this._modalService.open(AlertDeleteReason);
    modalRef.componentInstance.reasonId = reasonId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

@Component({
  selector: 'alert-delete-reason',
  template: `
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>Está seguro que desea borrar la razón de contrato?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="delete(reasonId)">Ok
      </button>
    </div>
  `
})
export class AlertDeleteReason {
  @Input() reasonId: string | any;

  constructor(public modal: NgbActiveModal, private reasonSvc: ReasonService) {
  }

  delete(reasonId: any) {
    this.reasonSvc.deleteReason(reasonId).then(r => r);
    this.modal.close();
  }
}
