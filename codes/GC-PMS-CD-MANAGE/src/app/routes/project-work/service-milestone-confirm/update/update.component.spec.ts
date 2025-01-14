import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceMilestoneConfirmUpdateComponent } from './update.component';

describe('ProjectWorkServiceMilestoneConfirmUpdateComponent', () => {
  let component: ProjectWorkServiceMilestoneConfirmUpdateComponent;
  let fixture: ComponentFixture<ProjectWorkServiceMilestoneConfirmUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceMilestoneConfirmUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceMilestoneConfirmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
