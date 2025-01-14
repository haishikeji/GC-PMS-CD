import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataRegisteredCapitalComponent } from './registered-capital.component';

describe('BasedataRegisteredCapitalComponent', () => {
  let component: BasedataRegisteredCapitalComponent;
  let fixture: ComponentFixture<BasedataRegisteredCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataRegisteredCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataRegisteredCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
