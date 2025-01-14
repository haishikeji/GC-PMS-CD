import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemMenuComponent } from './menu.component';

describe('SystemMenuComponent', () => {
  let component: SystemMenuComponent;
  let fixture: ComponentFixture<SystemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
