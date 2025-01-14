import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerComponent } from './customer.component';

describe('BasedataCustomerComponent', () => {
  let component: BasedataCustomerComponent;
  let fixture: ComponentFixture<BasedataCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
