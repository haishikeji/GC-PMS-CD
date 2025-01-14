import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractProcessViewProcessViewProductModuleComponent } from './product-module.component';

describe('ContractProcessViewProcessViewProductModuleComponent', () => {
  let component: ContractProcessViewProcessViewProductModuleComponent;
  let fixture: ComponentFixture<ContractProcessViewProcessViewProductModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractProcessViewProcessViewProductModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProcessViewProcessViewProductModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
