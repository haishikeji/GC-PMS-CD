import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesUpdateServicetaComponent } from './serviceta.component';

describe('ProjectManageArchivesUpdateServicetaComponent', () => {
  let component: ProjectManageArchivesUpdateServicetaComponent;
  let fixture: ComponentFixture<ProjectManageArchivesUpdateServicetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesUpdateServicetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesUpdateServicetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
