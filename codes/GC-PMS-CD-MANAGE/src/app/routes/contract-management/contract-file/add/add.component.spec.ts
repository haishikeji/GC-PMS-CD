import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileAddComponent } from './add.component';

describe('ContractManagementContractFileAddComponent', () => {
  let component: ContractManagementContractFileAddComponent;
  let fixture: ComponentFixture<ContractManagementContractFileAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
