import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDepartPersonnelAddSelectPkOrgComponent } from './select-pk-org.component';

describe('SystemDepartPersonnelAddSelectPkOrgComponent', () => {
  let component: SystemDepartPersonnelAddSelectPkOrgComponent;
  let fixture: ComponentFixture<SystemDepartPersonnelAddSelectPkOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDepartPersonnelAddSelectPkOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDepartPersonnelAddSelectPkOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
