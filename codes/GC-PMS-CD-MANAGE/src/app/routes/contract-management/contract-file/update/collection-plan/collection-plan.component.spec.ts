import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileUpdateCollectionPlanComponent } from './collection-plan.component';

describe('ContractManagementContractFileUpdateCollectionPlanComponent', () => {
  let component: ContractManagementContractFileUpdateCollectionPlanComponent;
  let fixture: ComponentFixture<ContractManagementContractFileUpdateCollectionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileUpdateCollectionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileUpdateCollectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
