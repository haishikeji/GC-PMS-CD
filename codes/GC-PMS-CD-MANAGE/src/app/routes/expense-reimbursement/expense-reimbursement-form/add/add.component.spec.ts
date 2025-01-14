import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseReimbursementExpenseReimbursementFormAddComponent } from './add.component';

describe('ExpenseReimbursementExpenseReimbursementFormAddComponent', () => {
  let component: ExpenseReimbursementExpenseReimbursementFormAddComponent;
  let fixture: ComponentFixture<ExpenseReimbursementExpenseReimbursementFormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseReimbursementExpenseReimbursementFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReimbursementExpenseReimbursementFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
