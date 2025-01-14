import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkDevelopmentMilestoneConfirmViewComponent } from './view.component';

describe('ProjectWorkDevelopmentMilestoneConfirmViewComponent', () => {
  let component: ProjectWorkDevelopmentMilestoneConfirmViewComponent;
  let fixture: ComponentFixture<ProjectWorkDevelopmentMilestoneConfirmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkDevelopmentMilestoneConfirmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkDevelopmentMilestoneConfirmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
