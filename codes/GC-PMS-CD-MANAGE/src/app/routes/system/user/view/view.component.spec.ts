import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemUserViewComponent } from './view.component';

describe('SystemUserViewComponent', () => {
  let component: SystemUserViewComponent;
  let fixture: ComponentFixture<SystemUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
