import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationLogUpdateComponent } from './update.component';

describe('ProjectWorkImplementationLogUpdateComponent', () => {
  let component: ProjectWorkImplementationLogUpdateComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationLogUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationLogUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationLogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
