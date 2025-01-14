import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerModalTableComponent } from './modal-table.component';

describe('BasedataCustomerModalTableComponent', () => {
  let component: BasedataCustomerModalTableComponent;
  let fixture: ComponentFixture<BasedataCustomerModalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerModalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerModalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
