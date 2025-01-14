import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemRoleAuthComponent } from './auth.component';

describe('SystemRoleAuthComponent', () => {
  let component: SystemRoleAuthComponent;
  let fixture: ComponentFixture<SystemRoleAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRoleAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRoleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
