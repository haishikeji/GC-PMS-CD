import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemTimedTaskAddComponent } from './add.component';

describe('SystemTimedTaskAddComponent', () => {
  let component: SystemTimedTaskAddComponent;
  let fixture: ComponentFixture<SystemTimedTaskAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTimedTaskAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTimedTaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
