import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesAddBusinessAffairsComponent } from './business-affairs.component';

describe('ProjectManageArchivesAddBusinessAffairsComponent', () => {
  let component: ProjectManageArchivesAddBusinessAffairsComponent;
  let fixture: ComponentFixture<ProjectManageArchivesAddBusinessAffairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesAddBusinessAffairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesAddBusinessAffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
