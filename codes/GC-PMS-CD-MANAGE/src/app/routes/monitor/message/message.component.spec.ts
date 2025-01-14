import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorMessageComponent } from './message.component';

describe('MonitorMessageComponent', () => {
  let component: MonitorMessageComponent;
  let fixture: ComponentFixture<MonitorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
