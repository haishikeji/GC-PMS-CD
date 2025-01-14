import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemRoleEditComponent } from './edit.component';

describe('SystemRoleEditComponent', () => {
  let component: SystemRoleEditComponent;
  let fixture: ComponentFixture<SystemRoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRoleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
