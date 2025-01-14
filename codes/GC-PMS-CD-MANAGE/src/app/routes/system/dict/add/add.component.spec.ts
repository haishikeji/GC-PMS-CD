import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDictAddComponent } from './add.component';

describe('SystemDictAddComponent', () => {
  let component: SystemDictAddComponent;
  let fixture: ComponentFixture<SystemDictAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDictAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
