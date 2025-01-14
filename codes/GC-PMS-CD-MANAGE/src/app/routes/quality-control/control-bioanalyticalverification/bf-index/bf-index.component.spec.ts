import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityControlControlBioanalyticalverificationBfIndexComponent } from './bf-index.component';

describe('QualityControlControlBioanalyticalverificationBfIndexComponent', () => {
  let component: QualityControlControlBioanalyticalverificationBfIndexComponent;
  let fixture: ComponentFixture<QualityControlControlBioanalyticalverificationBfIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlControlBioanalyticalverificationBfIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlControlBioanalyticalverificationBfIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
