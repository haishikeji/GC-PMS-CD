import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemPositionEditComponent } from './edit.component';

describe('SystemPositionEditComponent', () => {
  let component: SystemPositionEditComponent;
  let fixture: ComponentFixture<SystemPositionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPositionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
