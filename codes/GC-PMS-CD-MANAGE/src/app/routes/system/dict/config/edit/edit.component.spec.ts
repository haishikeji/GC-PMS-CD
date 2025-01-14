import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDictConfigEditComponent } from './edit.component';

describe('SystemDictConfigEditComponent', () => {
  let component: SystemDictConfigEditComponent;
  let fixture: ComponentFixture<SystemDictConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDictConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
