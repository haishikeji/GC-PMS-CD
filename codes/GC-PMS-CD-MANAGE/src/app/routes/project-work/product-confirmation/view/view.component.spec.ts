import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkProductConfirmationViewComponent } from './view.component';

describe('ProjectWorkProductConfirmationViewComponent', () => {
  let component: ProjectWorkProductConfirmationViewComponent;
  let fixture: ComponentFixture<ProjectWorkProductConfirmationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkProductConfirmationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkProductConfirmationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
