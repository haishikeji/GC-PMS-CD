import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceMilestoneConfirmAddComponent } from './add.component';

describe('ProjectWorkServiceMilestoneConfirmAddComponent', () => {
  let component: ProjectWorkServiceMilestoneConfirmAddComponent;
  let fixture: ComponentFixture<ProjectWorkServiceMilestoneConfirmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceMilestoneConfirmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceMilestoneConfirmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
