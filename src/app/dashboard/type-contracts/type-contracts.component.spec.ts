import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContractsComponent } from './type-contracts.component';

describe('TypeContractsComponent', () => {
  let component: TypeContractsComponent;
  let fixture: ComponentFixture<TypeContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
