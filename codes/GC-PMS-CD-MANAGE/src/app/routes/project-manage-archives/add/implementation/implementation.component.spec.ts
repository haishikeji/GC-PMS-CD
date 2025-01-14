import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesAddImplementationComponent } from './implementation.component';

describe('ProjectManageArchivesAddImplementationComponent', () => {
  let component: ProjectManageArchivesAddImplementationComponent;
  let fixture: ComponentFixture<ProjectManageArchivesAddImplementationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesAddImplementationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesAddImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
