import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemRoleAuthAuthDataRulesComponent } from './auth-data-rules.component';

describe('SystemRoleAuthAuthDataRulesComponent', () => {
  let component: SystemRoleAuthAuthDataRulesComponent;
  let fixture: ComponentFixture<SystemRoleAuthAuthDataRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRoleAuthAuthDataRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRoleAuthAuthDataRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
