import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkDevelopmentLogAddComponent } from './add.component';

describe('ProjectWorkDevelopmentLogAddComponent', () => {
  let component: ProjectWorkDevelopmentLogAddComponent;
  let fixture: ComponentFixture<ProjectWorkDevelopmentLogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkDevelopmentLogAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkDevelopmentLogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
