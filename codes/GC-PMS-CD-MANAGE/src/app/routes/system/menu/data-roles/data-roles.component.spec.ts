import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemMenuDataRolesComponent } from './data-roles.component';

describe('SystemMenuDataRolesComponent', () => {
  let component: SystemMenuDataRolesComponent;
  let fixture: ComponentFixture<SystemMenuDataRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMenuDataRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMenuDataRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
