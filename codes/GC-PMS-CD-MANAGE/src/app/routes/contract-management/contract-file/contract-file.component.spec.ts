import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileComponent } from './contract-file.component';

describe('ContractManagementContractFileComponent', () => {
  let component: ContractManagementContractFileComponent;
  let fixture: ComponentFixture<ContractManagementContractFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
