import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesViewComponent } from './view.component';

describe('ProjectManageArchivesViewComponent', () => {
  let component: ProjectManageArchivesViewComponent;
  let fixture: ComponentFixture<ProjectManageArchivesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
