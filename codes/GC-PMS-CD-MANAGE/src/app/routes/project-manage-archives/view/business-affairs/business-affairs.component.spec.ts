import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesViewBusinessAffairsComponent } from './business-affairs.component';

describe('ProjectManageArchivesViewBusinessAffairsComponent', () => {
  let component: ProjectManageArchivesViewBusinessAffairsComponent;
  let fixture: ComponentFixture<ProjectManageArchivesViewBusinessAffairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesViewBusinessAffairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesViewBusinessAffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
