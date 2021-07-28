import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";
import {Supplier} from "../../interfaces/supplier";
import {SupplierService} from "../../services/supplier.service";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  today = new Date();
  newFormSupplier: FormGroup;
  listSuppliers: Supplier[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private fb: FormBuilder, private supplierSvc: SupplierService, private _modalService: NgbModal) {
    this.newFormSupplier = this.fb.group({
      name: ['', Validators.required],
      ruc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.supplierSvc.getSuppliers()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Supplier[]) => {
        this.listSuppliers = res;
        console.log(this.listSuppliers)
      });
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormSupplier.valid) {

      const supplier = this.newFormSupplier.value;
      const supplierId = supplier?.id || null;
      supplier.name = supplier.name.toUpperCase();
      supplier.userId = userId;
      supplier.userDisplayName = userDisplayName;
      supplier.userEmail = userEmail;
      supplier.userPhotoUrl = userPhotoUrl;
      supplier.createdAt = this.today;
      supplier.updatedAt = this.today;
      this.supplierSvc.saveSupplier(supplier, supplierId).then(r => r).catch(err => console.log(err));
      this.newFormSupplier.reset();
    }
  }

  onDelete(supplierId: any) {
    const modalRef = this._modalService.open(AlertDeleteSupplier);
    modalRef.componentInstance.supplierId = supplierId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

@Component({
  selector: 'alert-delete-supplier',
  template: `
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>Está seguro que desea borrar el proveedor?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="delete(supplierId)">Ok
      </button>
    </div>
  `
})
export class AlertDeleteSupplier {
  @Input() supplierId: string | any;

  constructor(public modal: NgbActiveModal, private supplierSvc: SupplierService) {
  }

  delete(supplierId: any) {
    this.supplierSvc.deleteSupplier(supplierId).then(r => r);
    this.modal.close();
  }
}
