import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPaymentComponent } from './rent-payment.component';

describe('RentPaymentComponent', () => {
  let component: RentPaymentComponent;
  let fixture: ComponentFixture<RentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
