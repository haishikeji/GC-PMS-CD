import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesAddDevelopmentComponent } from './development.component';

describe('ProjectManageArchivesAddDevelopmentComponent', () => {
  let component: ProjectManageArchivesAddDevelopmentComponent;
  let fixture: ComponentFixture<ProjectManageArchivesAddDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesAddDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesAddDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
