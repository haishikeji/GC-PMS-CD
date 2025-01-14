import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataSalesStatusAddComponent } from './add.component';

describe('BasedataSalesStatusAddComponent', () => {
  let component: BasedataSalesStatusAddComponent;
  let fixture: ComponentFixture<BasedataSalesStatusAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataSalesStatusAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataSalesStatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
