import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemUpdatePasswordComponent } from './update-password.component';

describe('SystemUpdatePasswordComponent', () => {
  let component: SystemUpdatePasswordComponent;
  let fixture: ComponentFixture<SystemUpdatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUpdatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
