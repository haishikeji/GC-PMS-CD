import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceManagePurchaseUpdateComponent } from './update.component';

describe('InvoiceManagementInvoiceManagePurchaseUpdateComponent', () => {
  let component: InvoiceManagementInvoiceManagePurchaseUpdateComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceManagePurchaseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceManagePurchaseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceManagePurchaseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
