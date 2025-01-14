import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataUnitSizeComponent } from './unit-size.component';

describe('BasedataUnitSizeComponent', () => {
  let component: BasedataUnitSizeComponent;
  let fixture: ComponentFixture<BasedataUnitSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataUnitSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataUnitSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
