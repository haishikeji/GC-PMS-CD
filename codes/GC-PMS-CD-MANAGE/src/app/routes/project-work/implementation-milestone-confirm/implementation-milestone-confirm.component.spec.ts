import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationMilestoneConfirmComponent } from './implementation-milestone-confirm.component';

describe('ProjectWorkImplementationMilestoneConfirmComponent', () => {
  let component: ProjectWorkImplementationMilestoneConfirmComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationMilestoneConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationMilestoneConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationMilestoneConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
