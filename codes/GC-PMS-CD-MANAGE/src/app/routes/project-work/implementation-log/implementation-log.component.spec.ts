import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationLogComponent } from './implementation-log.component';

describe('ProjectWorkImplementationLogComponent', () => {
  let component: ProjectWorkImplementationLogComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
