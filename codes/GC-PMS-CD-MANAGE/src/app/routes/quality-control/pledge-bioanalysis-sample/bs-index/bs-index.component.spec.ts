import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlPledgeBioanalysisSampleBsIndexComponent } from './bs-index.component';

describe('QualityControlPledgeBioanalysisSampleBsIndexComponent', () => {
  let component: QualityControlPledgeBioanalysisSampleBsIndexComponent;
  let fixture: ComponentFixture<QualityControlPledgeBioanalysisSampleBsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlPledgeBioanalysisSampleBsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlPledgeBioanalysisSampleBsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
