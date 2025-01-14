import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileAddProductModuleComponent } from './product-module.component';

describe('ContractManagementContractFileAddProductModuleComponent', () => {
  let component: ContractManagementContractFileAddProductModuleComponent;
  let fixture: ComponentFixture<ContractManagementContractFileAddProductModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileAddProductModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileAddProductModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
