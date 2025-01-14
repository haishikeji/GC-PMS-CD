import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementReceiptUpdateComponent } from './update.component';

describe('DownPaymentManagementReceiptUpdateComponent', () => {
  let component: DownPaymentManagementReceiptUpdateComponent;
  let fixture: ComponentFixture<DownPaymentManagementReceiptUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementReceiptUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementReceiptUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
