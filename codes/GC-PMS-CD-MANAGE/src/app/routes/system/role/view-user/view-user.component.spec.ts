import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemRoleViewUserComponent } from './view-user.component';

describe('SystemRoleViewUserComponent', () => {
  let component: SystemRoleViewUserComponent;
  let fixture: ComponentFixture<SystemRoleViewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRoleViewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRoleViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
