import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationLogViewComponent } from './view.component';

describe('ProjectWorkImplementationLogViewComponent', () => {
  let component: ProjectWorkImplementationLogViewComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationLogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationLogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
