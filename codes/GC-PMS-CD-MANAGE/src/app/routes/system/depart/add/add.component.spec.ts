import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDepartAddComponent } from './add.component';

describe('SystemDepartAddComponent', () => {
  let component: SystemDepartAddComponent;
  let fixture: ComponentFixture<SystemDepartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDepartAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDepartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
