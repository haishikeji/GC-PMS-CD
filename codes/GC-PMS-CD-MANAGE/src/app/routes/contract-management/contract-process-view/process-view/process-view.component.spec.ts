import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractProcessViewProcessViewComponent } from './process-view.component';

describe('ContractProcessViewProcessViewComponent', () => {
  let component: ContractProcessViewProcessViewComponent;
  let fixture: ComponentFixture<ContractProcessViewProcessViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractProcessViewProcessViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProcessViewProcessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
