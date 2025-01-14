import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataCustomerIsAbbreviationComponent } from './is-abbreviation.component';

describe('BasedataCustomerIsAbbreviationComponent', () => {
  let component: BasedataCustomerIsAbbreviationComponent;
  let fixture: ComponentFixture<BasedataCustomerIsAbbreviationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataCustomerIsAbbreviationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataCustomerIsAbbreviationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
