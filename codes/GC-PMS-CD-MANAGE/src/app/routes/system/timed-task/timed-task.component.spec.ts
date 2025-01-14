import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemTimedTaskComponent } from './timed-task.component';

describe('SystemTimedTaskComponent', () => {
  let component: SystemTimedTaskComponent;
  let fixture: ComponentFixture<SystemTimedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTimedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTimedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
