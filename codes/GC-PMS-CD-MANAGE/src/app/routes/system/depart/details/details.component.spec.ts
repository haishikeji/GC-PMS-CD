import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDepartDetailsComponent } from './details.component';

describe('SystemDepartDetailsComponent', () => {
  let component: SystemDepartDetailsComponent;
  let fixture: ComponentFixture<SystemDepartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDepartDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDepartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
