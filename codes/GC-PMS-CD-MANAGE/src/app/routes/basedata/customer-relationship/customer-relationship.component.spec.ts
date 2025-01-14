import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerRelationshipComponent } from './customer-relationship.component';

describe('BasedataCustomerRelationshipComponent', () => {
  let component: BasedataCustomerRelationshipComponent;
  let fixture: ComponentFixture<BasedataCustomerRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
