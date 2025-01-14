import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileAddCollectionPlanComponent } from './collection-plan.component';

describe('ContractManagementContractFileAddCollectionPlanComponent', () => {
  let component: ContractManagementContractFileAddCollectionPlanComponent;
  let fixture: ComponentFixture<ContractManagementContractFileAddCollectionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileAddCollectionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileAddCollectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
