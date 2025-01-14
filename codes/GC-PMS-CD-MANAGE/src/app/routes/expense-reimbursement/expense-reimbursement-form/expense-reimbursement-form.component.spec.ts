import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseReimbursementExpenseReimbursementFormComponent } from './expense-reimbursement-form.component';

describe('ExpenseReimbursementExpenseReimbursementFormComponent', () => {
  let component: ExpenseReimbursementExpenseReimbursementFormComponent;
  let fixture: ComponentFixture<ExpenseReimbursementExpenseReimbursementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseReimbursementExpenseReimbursementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReimbursementExpenseReimbursementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
