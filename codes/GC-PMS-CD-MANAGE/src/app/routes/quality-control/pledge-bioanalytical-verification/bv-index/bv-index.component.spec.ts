import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlPledgeBioanalyticalVerificationBvIndexComponent } from './bv-index.component';

describe('QualityControlPledgeBioanalyticalVerificationBvIndexComponent', () => {
  let component: QualityControlPledgeBioanalyticalVerificationBvIndexComponent;
  let fixture: ComponentFixture<QualityControlPledgeBioanalyticalVerificationBvIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlPledgeBioanalyticalVerificationBvIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlPledgeBioanalyticalVerificationBvIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
