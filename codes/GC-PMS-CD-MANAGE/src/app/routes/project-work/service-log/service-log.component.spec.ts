import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceLogComponent } from './service-log.component';

describe('ProjectWorkServiceLogComponent', () => {
  let component: ProjectWorkServiceLogComponent;
  let fixture: ComponentFixture<ProjectWorkServiceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
