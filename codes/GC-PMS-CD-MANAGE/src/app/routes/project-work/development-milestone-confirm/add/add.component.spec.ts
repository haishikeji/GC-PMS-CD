import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkDevelopmentMilestoneConfirmAddComponent } from './add.component';

describe('ProjectWorkDevelopmentMilestoneConfirmAddComponent', () => {
  let component: ProjectWorkDevelopmentMilestoneConfirmAddComponent;
  let fixture: ComponentFixture<ProjectWorkDevelopmentMilestoneConfirmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkDevelopmentMilestoneConfirmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkDevelopmentMilestoneConfirmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
