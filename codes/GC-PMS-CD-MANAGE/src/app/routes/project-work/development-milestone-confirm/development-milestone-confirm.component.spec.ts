import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkDevelopmentMilestoneConfirmComponent } from './development-milestone-confirm.component';

describe('ProjectWorkDevelopmentMilestoneConfirmComponent', () => {
  let component: ProjectWorkDevelopmentMilestoneConfirmComponent;
  let fixture: ComponentFixture<ProjectWorkDevelopmentMilestoneConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkDevelopmentMilestoneConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkDevelopmentMilestoneConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
