import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataPostComponent } from './post.component';

describe('BasedataPostComponent', () => {
  let component: BasedataPostComponent;
  let fixture: ComponentFixture<BasedataPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
