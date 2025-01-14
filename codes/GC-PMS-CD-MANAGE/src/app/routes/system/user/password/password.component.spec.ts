import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemUserPasswordComponent } from './password.component';

describe('SystemUserPasswordComponent', () => {
  let component: SystemUserPasswordComponent;
  let fixture: ComponentFixture<SystemUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUserPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
