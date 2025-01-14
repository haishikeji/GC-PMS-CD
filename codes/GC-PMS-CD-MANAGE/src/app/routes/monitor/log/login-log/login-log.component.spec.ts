import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorLogLoginLogComponent } from './login-log.component';

describe('MonitorLogLoginLogComponent', () => {
  let component: MonitorLogLoginLogComponent;
  let fixture: ComponentFixture<MonitorLogLoginLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorLogLoginLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorLogLoginLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
