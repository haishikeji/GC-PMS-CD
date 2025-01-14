import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataSleepTypeComponent } from './sleep-type.component';

describe('BasedataSleepTypeComponent', () => {
  let component: BasedataSleepTypeComponent;
  let fixture: ComponentFixture<BasedataSleepTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataSleepTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataSleepTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
