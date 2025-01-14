import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataTestComponent } from './test.component';

describe('BasedataTestComponent', () => {
  let component: BasedataTestComponent;
  let fixture: ComponentFixture<BasedataTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
