import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataProjectApprovalAddComponent } from './add.component';

describe('BasedataProjectApprovalAddComponent', () => {
  let component: BasedataProjectApprovalAddComponent;
  let fixture: ComponentFixture<BasedataProjectApprovalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataProjectApprovalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataProjectApprovalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
