import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceMilestoneConfirmComponent } from './service-milestone-confirm.component';

describe('ProjectWorkServiceMilestoneConfirmComponent', () => {
  let component: ProjectWorkServiceMilestoneConfirmComponent;
  let fixture: ComponentFixture<ProjectWorkServiceMilestoneConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceMilestoneConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceMilestoneConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
