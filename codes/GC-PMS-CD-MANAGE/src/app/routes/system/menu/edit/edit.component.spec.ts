import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemMenuEditComponent } from './edit.component';

describe('SystemMenuEditComponent', () => {
  let component: SystemMenuEditComponent;
  let fixture: ComponentFixture<SystemMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
