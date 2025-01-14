import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDictConfigComponent } from './config.component';

describe('SystemDictConfigComponent', () => {
  let component: SystemDictConfigComponent;
  let fixture: ComponentFixture<SystemDictConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDictConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
