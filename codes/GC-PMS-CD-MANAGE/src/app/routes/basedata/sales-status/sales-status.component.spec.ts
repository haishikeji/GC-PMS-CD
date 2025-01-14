import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataSalesStatusComponent } from './sales-status.component';

describe('BasedataSalesStatusComponent', () => {
  let component: BasedataSalesStatusComponent;
  let fixture: ComponentFixture<BasedataSalesStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataSalesStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataSalesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
