import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomaticLogonListComponent } from './list.component';

describe('AutomaticLogonListComponent', () => {
  let component: AutomaticLogonListComponent;
  let fixture: ComponentFixture<AutomaticLogonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaticLogonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticLogonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
