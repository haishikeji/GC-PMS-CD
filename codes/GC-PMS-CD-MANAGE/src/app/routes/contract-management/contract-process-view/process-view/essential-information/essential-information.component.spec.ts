import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractProcessViewProcessViewEssentialInformationComponent } from './essential-information.component';

describe('ContractProcessViewProcessViewEssentialInformationComponent', () => {
  let component: ContractProcessViewProcessViewEssentialInformationComponent;
  let fixture: ComponentFixture<ContractProcessViewProcessViewEssentialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractProcessViewProcessViewEssentialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProcessViewProcessViewEssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
