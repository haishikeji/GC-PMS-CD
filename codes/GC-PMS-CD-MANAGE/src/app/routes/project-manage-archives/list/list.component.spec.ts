import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesListComponent } from './list.component';

describe('ProjectManageArchivesListComponent', () => {
  let component: ProjectManageArchivesListComponent;
  let fixture: ComponentFixture<ProjectManageArchivesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
