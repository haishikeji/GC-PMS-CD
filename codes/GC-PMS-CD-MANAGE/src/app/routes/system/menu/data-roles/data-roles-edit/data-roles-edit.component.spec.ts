import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemMenuDataRolesDataRolesEditComponent } from './data-roles-edit.component';

describe('SystemMenuDataRolesDataRolesEditComponent', () => {
  let component: SystemMenuDataRolesDataRolesEditComponent;
  let fixture: ComponentFixture<SystemMenuDataRolesDataRolesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMenuDataRolesDataRolesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMenuDataRolesDataRolesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
