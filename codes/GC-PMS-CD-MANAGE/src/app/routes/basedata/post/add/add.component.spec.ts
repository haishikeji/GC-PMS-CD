import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataPostAddComponent } from './add.component';

describe('BasedataPostAddComponent', () => {
  let component: BasedataPostAddComponent;
  let fixture: ComponentFixture<BasedataPostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataPostAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataPostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
