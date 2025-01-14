import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkImplementationLogAddComponent } from './add.component';

describe('ProjectWorkImplementationLogAddComponent', () => {
  let component: ProjectWorkImplementationLogAddComponent;
  let fixture: ComponentFixture<ProjectWorkImplementationLogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkImplementationLogAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkImplementationLogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
