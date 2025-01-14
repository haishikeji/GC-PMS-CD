import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataPersonnelSizeComponent } from './personnel-size.component';

describe('BasedataPersonnelSizeComponent', () => {
  let component: BasedataPersonnelSizeComponent;
  let fixture: ComponentFixture<BasedataPersonnelSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataPersonnelSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataPersonnelSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
