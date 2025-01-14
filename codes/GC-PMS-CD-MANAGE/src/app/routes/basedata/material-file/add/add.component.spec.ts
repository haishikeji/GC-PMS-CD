import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasedataMaterialFileAddComponent } from './add.component';

describe('BasedataMaterialFileAddComponent', () => {
  let component: BasedataMaterialFileAddComponent;
  let fixture: ComponentFixture<BasedataMaterialFileAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedataMaterialFileAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedataMaterialFileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
