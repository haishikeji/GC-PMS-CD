import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerCustomerAddComponent } from './customer-add.component';

describe('BasedataCustomerCustomerAddComponent', () => {
  let component: BasedataCustomerCustomerAddComponent;
  let fixture: ComponentFixture<BasedataCustomerCustomerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerCustomerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerCustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
