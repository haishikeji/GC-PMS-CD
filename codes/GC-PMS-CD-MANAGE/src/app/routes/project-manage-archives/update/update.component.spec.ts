import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesUpdateComponent } from './update.component';

describe('ProjectManageArchivesUpdateComponent', () => {
  let component: ProjectManageArchivesUpdateComponent;
  let fixture: ComponentFixture<ProjectManageArchivesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
