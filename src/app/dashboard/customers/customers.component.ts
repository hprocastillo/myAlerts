import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";
import {Customer} from "../../interfaces/customer";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  today = new Date();
  newFormCustomer: FormGroup;
  listCustomers: Customer[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private fb: FormBuilder, private customerSvc: CustomerService, private _modalService: NgbModal) {
    this.newFormCustomer = this.fb.group({
      name: ['', Validators.required],
      ruc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.customerSvc.getCustomers()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Customer[]) => {
        this.listCustomers = res;
        console.log(this.listCustomers)
      });
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormCustomer.valid) {
      const customer = this.newFormCustomer.value;
      const customerId = customer?.id || null;
      customer.name = customer.name.toUpperCase();
      customer.userId = userId;
      customer.userDisplayName = userDisplayName;
      customer.userEmail = userEmail;
      customer.userPhotoUrl = userPhotoUrl;
      customer.createdAt = this.today;
      customer.updatedAt = this.today;
      this.customerSvc.saveCustomer(customer, customerId).then(r => r).catch(err => console.log(err));
      this.newFormCustomer.reset();
    }
  }

  onDelete(customerId: any) {
    const modalRef = this._modalService.open(AlertDeleteCustomer);
    modalRef.componentInstance.customerId = customerId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

@Component({
  selector: 'alert-delete-customer',
  template: `
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>Está seguro que desea borrar el Cliente?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="delete(customerId)">Ok
      </button>
    </div>
  `
})
export class AlertDeleteCustomer {
  @Input() customerId: string | any;

  constructor(public modal: NgbActiveModal, private customerSvc: CustomerService) {
  }

  delete(customerId: any) {
    this.customerSvc.deleteCustomer(customerId).then(r => r);
    this.modal.close();
  }
}
