import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementPaymentSlipUpdateComponent } from './update.component';

describe('DownPaymentManagementPaymentSlipUpdateComponent', () => {
  let component: DownPaymentManagementPaymentSlipUpdateComponent;
  let fixture: ComponentFixture<DownPaymentManagementPaymentSlipUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementPaymentSlipUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementPaymentSlipUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
