import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkServiceLogUpdateComponent } from './update.component';

describe('ProjectWorkServiceLogUpdateComponent', () => {
  let component: ProjectWorkServiceLogUpdateComponent;
  let fixture: ComponentFixture<ProjectWorkServiceLogUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkServiceLogUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkServiceLogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
