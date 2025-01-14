import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesViewEssentialInformationComponent } from './essential-information.component';

describe('ProjectManageArchivesViewEssentialInformationComponent', () => {
  let component: ProjectManageArchivesViewEssentialInformationComponent;
  let fixture: ComponentFixture<ProjectManageArchivesViewEssentialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesViewEssentialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesViewEssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
