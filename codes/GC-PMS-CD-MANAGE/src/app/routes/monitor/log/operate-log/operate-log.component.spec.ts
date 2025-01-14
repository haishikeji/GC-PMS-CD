import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorLogOperateLogComponent } from './operate-log.component';

describe('MonitorLogOperateLogComponent', () => {
  let component: MonitorLogOperateLogComponent;
  let fixture: ComponentFixture<MonitorLogOperateLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorLogOperateLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorLogOperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
