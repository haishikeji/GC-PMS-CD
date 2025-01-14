import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemMenuIconComponent } from './icon.component';

describe('SystemMenuIconComponent', () => {
  let component: SystemMenuIconComponent;
  let fixture: ComponentFixture<SystemMenuIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMenuIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
