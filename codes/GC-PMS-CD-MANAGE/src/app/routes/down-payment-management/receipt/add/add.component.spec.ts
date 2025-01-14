import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementReceiptAddComponent } from './add.component';

describe('DownPaymentManagementReceiptAddComponent', () => {
  let component: DownPaymentManagementReceiptAddComponent;
  let fixture: ComponentFixture<DownPaymentManagementReceiptAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementReceiptAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementReceiptAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
