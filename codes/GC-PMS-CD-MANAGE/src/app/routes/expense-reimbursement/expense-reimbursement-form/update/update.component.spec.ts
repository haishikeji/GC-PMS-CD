import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseReimbursementExpenseReimbursementFormUpdateComponent } from './update.component';

describe('ExpenseReimbursementExpenseReimbursementFormUpdateComponent', () => {
  let component: ExpenseReimbursementExpenseReimbursementFormUpdateComponent;
  let fixture: ComponentFixture<ExpenseReimbursementExpenseReimbursementFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseReimbursementExpenseReimbursementFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReimbursementExpenseReimbursementFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
