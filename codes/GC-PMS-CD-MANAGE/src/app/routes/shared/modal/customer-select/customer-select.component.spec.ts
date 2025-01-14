import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesSharedModalCustomerSelectComponent } from './customer-select.component';

describe('RoutesSharedModalCustomerSelectComponent', () => {
  let component: RoutesSharedModalCustomerSelectComponent;
  let fixture: ComponentFixture<RoutesSharedModalCustomerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesSharedModalCustomerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesSharedModalCustomerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
