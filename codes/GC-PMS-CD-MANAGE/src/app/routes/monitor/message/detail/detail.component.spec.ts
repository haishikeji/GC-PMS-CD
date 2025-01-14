import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorMessageDetailComponent } from './detail.component';

describe('MonitorMessageDetailComponent', () => {
  let component: MonitorMessageDetailComponent;
  let fixture: ComponentFixture<MonitorMessageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorMessageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorMessageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
