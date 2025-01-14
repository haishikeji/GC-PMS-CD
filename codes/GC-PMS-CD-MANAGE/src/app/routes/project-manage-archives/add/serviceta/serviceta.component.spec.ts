import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesAddServicetaComponent } from './serviceta.component';

describe('ProjectManageArchivesAddServicetaComponent', () => {
  let component: ProjectManageArchivesAddServicetaComponent;
  let fixture: ComponentFixture<ProjectManageArchivesAddServicetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesAddServicetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesAddServicetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
