import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlControlBioanalysisSampleBsIndexComponent } from './bs-index.component';

describe('QualityControlControlBioanalysisSampleBsIndexComponent', () => {
  let component: QualityControlControlBioanalysisSampleBsIndexComponent;
  let fixture: ComponentFixture<QualityControlControlBioanalysisSampleBsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlControlBioanalysisSampleBsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlControlBioanalysisSampleBsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
