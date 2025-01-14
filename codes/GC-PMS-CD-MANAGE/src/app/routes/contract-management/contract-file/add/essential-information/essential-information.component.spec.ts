import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileAddEssentialInformationComponent } from './essential-information.component';

describe('ContractManagementContractFileAddEssentialInformationComponent', () => {
  let component: ContractManagementContractFileAddEssentialInformationComponent;
  let fixture: ComponentFixture<ContractManagementContractFileAddEssentialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileAddEssentialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileAddEssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
