import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractProcessViewProcessViewCollectionPlanComponent } from './collection-plan.component';

describe('ContractProcessViewProcessViewCollectionPlanComponent', () => {
  let component: ContractProcessViewProcessViewCollectionPlanComponent;
  let fixture: ComponentFixture<ContractProcessViewProcessViewCollectionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractProcessViewProcessViewCollectionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProcessViewProcessViewCollectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
