import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerDetailsComponent } from './details.component';

describe('BasedataCustomerDetailsComponent', () => {
  let component: BasedataCustomerDetailsComponent;
  let fixture: ComponentFixture<BasedataCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
