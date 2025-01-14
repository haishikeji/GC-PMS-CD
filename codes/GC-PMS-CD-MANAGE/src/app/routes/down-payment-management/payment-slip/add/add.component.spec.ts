import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementPaymentSlipAddComponent } from './add.component';

describe('DownPaymentManagementPaymentSlipAddComponent', () => {
  let component: DownPaymentManagementPaymentSlipAddComponent;
  let fixture: ComponentFixture<DownPaymentManagementPaymentSlipAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementPaymentSlipAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementPaymentSlipAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
