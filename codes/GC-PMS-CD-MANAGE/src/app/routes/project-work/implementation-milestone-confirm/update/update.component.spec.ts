import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationMilestoneConfirmUpdateComponent } from './update.component';

describe('ProjectWorkImplementationMilestoneConfirmUpdateComponent', () => {
  let component: ProjectWorkImplementationMilestoneConfirmUpdateComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationMilestoneConfirmUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationMilestoneConfirmUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationMilestoneConfirmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
