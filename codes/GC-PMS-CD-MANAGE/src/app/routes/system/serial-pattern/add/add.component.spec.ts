import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemSerialPatternAddComponent } from './add.component';

describe('SystemSerialPatternAddComponent', () => {
  let component: SystemSerialPatternAddComponent;
  let fixture: ComponentFixture<SystemSerialPatternAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSerialPatternAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSerialPatternAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
