import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceLogViewComponent } from './view.component';

describe('ProjectWorkServiceLogViewComponent', () => {
  let component: ProjectWorkServiceLogViewComponent;
  let fixture: ComponentFixture<ProjectWorkServiceLogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceLogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
