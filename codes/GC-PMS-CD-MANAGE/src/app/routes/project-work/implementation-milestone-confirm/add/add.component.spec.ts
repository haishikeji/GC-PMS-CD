import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationMilestoneConfirmAddComponent } from './add.component';

describe('ProjectWorkImplementationMilestoneConfirmAddComponent', () => {
  let component: ProjectWorkImplementationMilestoneConfirmAddComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationMilestoneConfirmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationMilestoneConfirmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationMilestoneConfirmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
