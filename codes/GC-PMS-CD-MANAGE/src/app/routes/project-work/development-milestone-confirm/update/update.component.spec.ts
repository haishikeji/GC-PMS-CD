import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkDevelopmentMilestoneConfirmUpdateComponent } from './update.component';

describe('ProjectWorkDevelopmentMilestoneConfirmUpdateComponent', () => {
  let component: ProjectWorkDevelopmentMilestoneConfirmUpdateComponent;
  let fixture: ComponentFixture<ProjectWorkDevelopmentMilestoneConfirmUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkDevelopmentMilestoneConfirmUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkDevelopmentMilestoneConfirmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
