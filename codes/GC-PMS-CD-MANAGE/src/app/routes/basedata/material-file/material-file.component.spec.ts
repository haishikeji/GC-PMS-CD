import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMaterialFileComponent } from './material-file.component';

describe('BasedataMaterialFileComponent', () => {
  let component: BasedataMaterialFileComponent;
  let fixture: ComponentFixture<BasedataMaterialFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMaterialFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMaterialFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
