import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContractByIdComponent } from './type-contract-by-id.component';

describe('TypeContractByIdComponent', () => {
  let component: TypeContractByIdComponent;
  let fixture: ComponentFixture<TypeContractByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeContractByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContractByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
