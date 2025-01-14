import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataValueLevelComponent } from './value-level.component';

describe('BasedataValueLevelComponent', () => {
  let component: BasedataValueLevelComponent;
  let fixture: ComponentFixture<BasedataValueLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataValueLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataValueLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
