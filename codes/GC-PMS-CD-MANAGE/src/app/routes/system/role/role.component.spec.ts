import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemRoleComponent } from './role.component';

describe('SystemRoleComponent', () => {
  let component: SystemRoleComponent;
  let fixture: ComponentFixture<SystemRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
