import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkProductConfirmationUpdateComponent } from './update.component';

describe('ProjectWorkProductConfirmationUpdateComponent', () => {
  let component: ProjectWorkProductConfirmationUpdateComponent;
  let fixture: ComponentFixture<ProjectWorkProductConfirmationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkProductConfirmationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkProductConfirmationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
