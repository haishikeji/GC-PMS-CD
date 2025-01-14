import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemSerialPatternComponent } from './serial-pattern.component';

describe('SystemSerialPatternComponent', () => {
  let component: SystemSerialPatternComponent;
  let fixture: ComponentFixture<SystemSerialPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSerialPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSerialPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
