import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesUpdateBusinessAffairsComponent } from './business-affairs.component';

describe('ProjectManageArchivesUpdateBusinessAffairsComponent', () => {
  let component: ProjectManageArchivesUpdateBusinessAffairsComponent;
  let fixture: ComponentFixture<ProjectManageArchivesUpdateBusinessAffairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesUpdateBusinessAffairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesUpdateBusinessAffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
