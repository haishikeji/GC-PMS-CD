import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesAddEssentialInformationComponent } from './essential-information.component';

describe('ProjectManageArchivesAddEssentialInformationComponent', () => {
  let component: ProjectManageArchivesAddEssentialInformationComponent;
  let fixture: ComponentFixture<ProjectManageArchivesAddEssentialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesAddEssentialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesAddEssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
