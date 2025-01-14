import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerClassificationComponent } from './customer-classification.component';

describe('BasedataCustomerClassificationComponent', () => {
  let component: BasedataCustomerClassificationComponent;
  let fixture: ComponentFixture<BasedataCustomerClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
