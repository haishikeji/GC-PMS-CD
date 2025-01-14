import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesUpdateDevelopmentComponent } from './development.component';

describe('ProjectManageArchivesUpdateDevelopmentComponent', () => {
  let component: ProjectManageArchivesUpdateDevelopmentComponent;
  let fixture: ComponentFixture<ProjectManageArchivesUpdateDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesUpdateDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesUpdateDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
