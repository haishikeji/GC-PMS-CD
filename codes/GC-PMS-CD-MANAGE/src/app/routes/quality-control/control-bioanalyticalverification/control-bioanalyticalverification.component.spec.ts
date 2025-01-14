import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlControlBioanalyticalverificationComponent } from './control-bioanalyticalverification.component';

describe('QualityControlControlBioanalyticalverificationComponent', () => {
  let component: QualityControlControlBioanalyticalverificationComponent;
  let fixture: ComponentFixture<QualityControlControlBioanalyticalverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlControlBioanalyticalverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlControlBioanalyticalverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
