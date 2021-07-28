import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../../services/contract.service";
import {SupplierService} from "../../../services/supplier.service";
import {ReasonService} from "../../../services/reason.service";
import {TypeContractService} from "../../../services/type-contract.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Customer} from "../../../interfaces/customer";
import {CustomerService} from "../../../services/customer.service";
import {TypeContract} from "../../../interfaces/type-contract";
import {Supplier} from "../../../interfaces/supplier";
import {Reason} from "../../../interfaces/reason";

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {
  @Input() user = {} as User;
  today = new Date();
  newFormContract: FormGroup;

  //query collections
  listCustomers: Customer[] = [];
  listTypeContracts: TypeContract[] = [];
  listSuppliers: Supplier[] = [];
  supplierSelected: Supplier[] = [];
  listReasons: Reason[] = [];

  //Data from form
  typeContractId: string = '';
  customerId: string = '';
  supplierId: string = '';
  reasonId: string = '';
  dateStart: string = '';
  dateEnd: string = '';
  attachment: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private supplierSvc: SupplierService, private reasonSvc: ReasonService,
              private typeContractSvc: TypeContractService, private contractsSvc: ContractService, private customerSvc: CustomerService) {
    this.newFormContract = this.fb.group({
      code: ['', [Validators.required]],
      agreedPayment: ['', [Validators.required]],
      observations: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //get customer list
    this.customerSvc.getCustomers()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Customer[]) => {
        this.listCustomers = res;
      });
    //get type Contracts list
    this.typeContractSvc.getTypeContract()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: TypeContract[]) => {
        this.listTypeContracts = res;
      });
    //get suppliers list
    this.supplierSvc.getSuppliers()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Supplier[]) => {
        this.listSuppliers = res;
      });
    //get reasons list
    this.reasonSvc.getReason()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Reason[]) => {
        this.listReasons = res;
      });
  }

  getDateStart(event: any) {
    this.dateStart = event.value;
  }

  getDateEnd(event: any) {
    this.dateEnd = event.value;
  }

  getAttachment(event: any) {
    this.attachment = event.checked;
  }

  getTypeContract(event: any) {
    this.typeContractId = event.value;
  }

  getCustomer(event: any) {
    this.customerId = event.value;
  }

  getSupplier(event: any) {
    this.supplierId = event.value;
    this.supplierSelected = this.listSuppliers.filter(item => {
      return item.id === this.supplierId;
    })
  }

  getReason(event: any) {
    this.reasonId = event.value;
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormContract.valid) {
      const contract = this.newFormContract.value;
      const contractId = contract?.id || null;
      contract.code = contract.code.toUpperCase();
      contract.customerId = this.customerId;
      contract.typeContractId = this.typeContractId;
      contract.supplierId = this.supplierId;
      contract.reasonId = this.reasonId;
      contract.attachments = this.attachment;
      contract.userId = userId;
      contract.userDisplayName = userDisplayName;
      contract.userEmail = userEmail;
      contract.userPhotoUrl = userPhotoUrl;
      contract.dateStart = new Date(this.dateStart + 'T00:00:00');
      contract.dateEnd = new Date(this.dateEnd + 'T00:00:00');
      contract.createdAt = this.today;
      contract.updatedAt = this.today;
      this.contractsSvc.saveContract(contract, contractId).then(r => r).catch(err => console.log(err));
      this.newFormContract.reset();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
