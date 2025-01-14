import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceLogAddComponent } from './add.component';

describe('ProjectWorkServiceLogAddComponent', () => {
  let component: ProjectWorkServiceLogAddComponent;
  let fixture: ComponentFixture<ProjectWorkServiceLogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceLogAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceLogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
