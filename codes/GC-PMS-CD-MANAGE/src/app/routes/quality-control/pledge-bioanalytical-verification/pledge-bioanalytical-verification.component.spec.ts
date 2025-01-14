import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlPledgeBioanalyticalVerificationComponent } from './pledge-bioanalytical-verification.component';

describe('QualityControlPledgeBioanalyticalVerificationComponent', () => {
  let component: QualityControlPledgeBioanalyticalVerificationComponent;
  let fixture: ComponentFixture<QualityControlPledgeBioanalyticalVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlPledgeBioanalyticalVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlPledgeBioanalyticalVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
