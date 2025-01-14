import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMaterialFileDetailsComponent } from './details.component';

describe('BasedataMaterialFileDetailsComponent', () => {
  let component: BasedataMaterialFileDetailsComponent;
  let fixture: ComponentFixture<BasedataMaterialFileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMaterialFileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMaterialFileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
