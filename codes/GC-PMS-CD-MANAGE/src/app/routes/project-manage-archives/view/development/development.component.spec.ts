import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesViewDevelopmentComponent } from './development.component';

describe('ProjectManageArchivesViewDevelopmentComponent', () => {
  let component: ProjectManageArchivesViewDevelopmentComponent;
  let fixture: ComponentFixture<ProjectManageArchivesViewDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesViewDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesViewDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
