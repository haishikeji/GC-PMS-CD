import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractManagementContractFileUpdateComponent } from './update.component';

describe('ContractManagementContractFileUpdateComponent', () => {
  let component: ContractManagementContractFileUpdateComponent;
  let fixture: ComponentFixture<ContractManagementContractFileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementContractFileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementContractFileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
