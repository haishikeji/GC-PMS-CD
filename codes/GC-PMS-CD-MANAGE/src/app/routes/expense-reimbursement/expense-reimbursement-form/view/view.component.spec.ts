import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseReimbursementExpenseReimbursementFormViewComponent } from './view.component';

describe('ExpenseReimbursementExpenseReimbursementFormViewComponent', () => {
  let component: ExpenseReimbursementExpenseReimbursementFormViewComponent;
  let fixture: ComponentFixture<ExpenseReimbursementExpenseReimbursementFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseReimbursementExpenseReimbursementFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReimbursementExpenseReimbursementFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
