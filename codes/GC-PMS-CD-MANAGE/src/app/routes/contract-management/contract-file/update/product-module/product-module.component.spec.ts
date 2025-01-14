import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileUpdateProductModuleComponent } from './product-module.component';

describe('ContractManagementContractFileUpdateProductModuleComponent', () => {
  let component: ContractManagementContractFileUpdateProductModuleComponent;
  let fixture: ComponentFixture<ContractManagementContractFileUpdateProductModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileUpdateProductModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileUpdateProductModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
