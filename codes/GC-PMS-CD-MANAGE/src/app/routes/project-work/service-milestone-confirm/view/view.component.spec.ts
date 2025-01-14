import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceMilestoneConfirmViewComponent } from './view.component';

describe('ProjectWorkServiceMilestoneConfirmViewComponent', () => {
  let component: ProjectWorkServiceMilestoneConfirmViewComponent;
  let fixture: ComponentFixture<ProjectWorkServiceMilestoneConfirmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceMilestoneConfirmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceMilestoneConfirmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
