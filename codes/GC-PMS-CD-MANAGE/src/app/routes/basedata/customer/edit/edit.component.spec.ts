import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerEditComponent } from './edit.component';

describe('BasedataCustomerEditComponent', () => {
  let component: BasedataCustomerEditComponent;
  let fixture: ComponentFixture<BasedataCustomerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
