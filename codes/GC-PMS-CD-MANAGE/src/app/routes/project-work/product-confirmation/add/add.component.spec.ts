import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWorkProductConfirmationAddComponent } from './add.component';

describe('ProjectWorkProductConfirmationAddComponent', () => {
  let component: ProjectWorkProductConfirmationAddComponent;
  let fixture: ComponentFixture<ProjectWorkProductConfirmationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkProductConfirmationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkProductConfirmationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
