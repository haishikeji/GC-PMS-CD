import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesMessageNotificationComponent } from './message-notification.component';

describe('RoutesMessageNotificationComponent', () => {
  let component: RoutesMessageNotificationComponent;
  let fixture: ComponentFixture<RoutesMessageNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesMessageNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesMessageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
