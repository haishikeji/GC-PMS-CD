import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlProcessAndFacilityHomePageComponent } from './home-page.component';

describe('QualityControlProcessAndFacilityHomePageComponent', () => {
  let component: QualityControlProcessAndFacilityHomePageComponent;
  let fixture: ComponentFixture<QualityControlProcessAndFacilityHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlProcessAndFacilityHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlProcessAndFacilityHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
