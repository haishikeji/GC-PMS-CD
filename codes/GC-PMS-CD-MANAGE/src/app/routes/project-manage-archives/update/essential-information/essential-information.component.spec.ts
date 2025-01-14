import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesUpdateEssentialInformationComponent } from './essential-information.component';

describe('ProjectManageArchivesUpdateEssentialInformationComponent', () => {
  let component: ProjectManageArchivesUpdateEssentialInformationComponent;
  let fixture: ComponentFixture<ProjectManageArchivesUpdateEssentialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesUpdateEssentialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesUpdateEssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
