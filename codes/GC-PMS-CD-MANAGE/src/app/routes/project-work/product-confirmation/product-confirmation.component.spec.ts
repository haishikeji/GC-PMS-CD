import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkProductConfirmationComponent } from './product-confirmation.component';

describe('ProjectWorkProductConfirmationComponent', () => {
  let component: ProjectWorkProductConfirmationComponent;
  let fixture: ComponentFixture<ProjectWorkProductConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkProductConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkProductConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
