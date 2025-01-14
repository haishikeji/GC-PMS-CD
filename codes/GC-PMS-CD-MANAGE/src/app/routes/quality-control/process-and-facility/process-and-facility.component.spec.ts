import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlProcessAndFacilityComponent } from './process-and-facility.component';

describe('QualityControlProcessAndFacilityComponent', () => {
  let component: QualityControlProcessAndFacilityComponent;
  let fixture: ComponentFixture<QualityControlProcessAndFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlProcessAndFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlProcessAndFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
