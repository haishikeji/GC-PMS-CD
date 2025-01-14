import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceManagePurchaseViewComponent } from './view.component';

describe('InvoiceManagementInvoiceManagePurchaseViewComponent', () => {
  let component: InvoiceManagementInvoiceManagePurchaseViewComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceManagePurchaseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceManagePurchaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceManagePurchaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
