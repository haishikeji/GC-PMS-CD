import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataProjectApprovalComponent } from './project-approval.component';

describe('BasedataProjectApprovalComponent', () => {
  let component: BasedataProjectApprovalComponent;
  let fixture: ComponentFixture<BasedataProjectApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataProjectApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataProjectApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
