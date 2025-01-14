import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDepartComponent } from './depart.component';

describe('SystemDepartComponent', () => {
  let component: SystemDepartComponent;
  let fixture: ComponentFixture<SystemDepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
