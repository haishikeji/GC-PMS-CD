import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementPaymentSlipComponent } from './payment-slip.component';

describe('DownPaymentManagementPaymentSlipComponent', () => {
  let component: DownPaymentManagementPaymentSlipComponent;
  let fixture: ComponentFixture<DownPaymentManagementPaymentSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementPaymentSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementPaymentSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
