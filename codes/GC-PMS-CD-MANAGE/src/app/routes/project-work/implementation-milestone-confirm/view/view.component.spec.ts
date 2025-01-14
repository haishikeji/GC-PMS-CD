import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationMilestoneConfirmViewComponent } from './view.component';

describe('ProjectWorkImplementationMilestoneConfirmViewComponent', () => {
  let component: ProjectWorkImplementationMilestoneConfirmViewComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationMilestoneConfirmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationMilestoneConfirmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationMilestoneConfirmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
