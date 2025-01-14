import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileUpdateEssentialInformationComponent } from './essential-information.component';

describe('ContractManagementContractFileUpdateEssentialInformationComponent', () => {
  let component: ContractManagementContractFileUpdateEssentialInformationComponent;
  let fixture: ComponentFixture<ContractManagementContractFileUpdateEssentialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileUpdateEssentialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileUpdateEssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
