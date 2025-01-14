import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerGroupingComponent } from './customer-grouping.component';

describe('BasedataCustomerGroupingComponent', () => {
  let component: BasedataCustomerGroupingComponent;
  let fixture: ComponentFixture<BasedataCustomerGroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerGroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
