import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementCollectionConfirmationComponent } from './collection-confirmation.component';

describe('DownPaymentManagementCollectionConfirmationComponent', () => {
  let component: DownPaymentManagementCollectionConfirmationComponent;
  let fixture: ComponentFixture<DownPaymentManagementCollectionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementCollectionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementCollectionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
