import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesViewServicetaComponent } from './serviceta.component';

describe('ProjectManageArchivesViewServicetaComponent', () => {
  let component: ProjectManageArchivesViewServicetaComponent;
  let fixture: ComponentFixture<ProjectManageArchivesViewServicetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesViewServicetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesViewServicetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
