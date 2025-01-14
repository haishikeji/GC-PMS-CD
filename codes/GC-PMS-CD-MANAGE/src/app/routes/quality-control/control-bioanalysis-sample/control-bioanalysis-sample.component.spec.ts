import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlControlBioanalysisSampleComponent } from './control-bioanalysis-sample.component';

describe('QualityControlControlBioanalysisSampleComponent', () => {
  let component: QualityControlControlBioanalysisSampleComponent;
  let fixture: ComponentFixture<QualityControlControlBioanalysisSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlControlBioanalysisSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlControlBioanalysisSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
