import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesViewImplementationComponent } from './implementation.component';

describe('ProjectManageArchivesViewImplementationComponent', () => {
  let component: ProjectManageArchivesViewImplementationComponent;
  let fixture: ComponentFixture<ProjectManageArchivesViewImplementationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesViewImplementationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesViewImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
