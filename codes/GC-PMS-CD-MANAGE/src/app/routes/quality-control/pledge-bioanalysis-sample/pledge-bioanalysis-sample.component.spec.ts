import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlPledgeBioanalysisSampleComponent } from './pledge-bioanalysis-sample.component';

describe('QualityControlPledgeBioanalysisSampleComponent', () => {
  let component: QualityControlPledgeBioanalysisSampleComponent;
  let fixture: ComponentFixture<QualityControlPledgeBioanalysisSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlPledgeBioanalysisSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlPledgeBioanalysisSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
