import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementPaymentSlipViewComponent } from './view.component';

describe('DownPaymentManagementPaymentSlipViewComponent', () => {
  let component: DownPaymentManagementPaymentSlipViewComponent;
  let fixture: ComponentFixture<DownPaymentManagementPaymentSlipViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementPaymentSlipViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementPaymentSlipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
