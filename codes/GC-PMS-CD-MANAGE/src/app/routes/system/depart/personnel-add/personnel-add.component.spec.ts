import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDepartPersonnelAddComponent } from './personnel-add.component';

describe('SystemDepartPersonnelAddComponent', () => {
  let component: SystemDepartPersonnelAddComponent;
  let fixture: ComponentFixture<SystemDepartPersonnelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDepartPersonnelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDepartPersonnelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
