import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectManageArchivesAddComponent } from './add.component';

describe('ProjectManageArchivesAddComponent', () => {
  let component: ProjectManageArchivesAddComponent;
  let fixture: ComponentFixture<ProjectManageArchivesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManageArchivesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManageArchivesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
