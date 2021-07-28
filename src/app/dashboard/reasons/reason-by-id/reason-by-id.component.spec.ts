import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonByIdComponent } from './reason-by-id.component';

describe('ReasonByIdComponent', () => {
  let component: ReasonByIdComponent;
  let fixture: ComponentFixture<ReasonByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
